import CompModule from "../comp.module.css"
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateInterface, TypeTovar, setAddTovar, setApplicationType,  setTovarDecCount, setTovarIncCount, setTovars } from "../../Settings";
import axios from "axios";
import { useQuery } from "react-query";
import { Container, Layout } from "../../Components";
import { Button, Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import Meta from "antd/es/card/Meta";
import Text from "antd/es/typography/Text"
import { useCart } from "react-use-cart";
import { useLocation } from "react-router";
export const Store: React.FC = (): JSX.Element => {
    const { token, arrayImages, applicationType, shoppingCart }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const dispatch = useDispatch()
    const { items } = useCart()
    const handleGetTovar = async () => {
        if (token) {
            const request = await axios.get(process.env.REACT_APP_SERVER + "/tovars")
            if (request?.status === 200) {
                const response = await request.data
                return response
            }
        }
    }
    const { data, isLoading, isError, isSuccess } = useQuery<TypeTovar[], Error>("/tovars", handleGetTovar, {
        refetchOnWindowFocus: false
    })
    const handleAddCart = (event: React.MouseEvent<HTMLButtonElement>, tovar: TypeTovar): void => {
        const updateTovar = {...tovar}
        if(tovar.quantity === 0){
            updateTovar.quantity += 1
        }else if(tovar.quantity > 1 || tovar.quantity === 1){
            updateTovar.quantity = 0
        }   
        dispatch(setAddTovar(updateTovar))
    }
    const handleTovarCount = (event:React.MouseEvent<HTMLButtonElement>, tovar: TypeTovar, type:string):boolean | void => {
        switch(type){
            case "inc":{
                dispatch(setTovarIncCount(tovar))
            }break;
            case "dec":{
                dispatch(setTovarDecCount(tovar))
            }break;
            default: return false
        }
    }
    const {pathname} = useLocation()
    useEffect(() => {
    if(pathname.substring(0, 9) === "/by-redux"){
      dispatch(setApplicationType("redux"))      
    }else if(pathname.substring(0, 10) === "/libary"){
      dispatch(setApplicationType("libary"))
    }
  },[pathname])
    return (
        <>
            <Layout>
                <Container>
                    <Row className={CompModule.card__inner} align={"middle"}>
                        {isLoading && (
                            <Col>
                                <Title>
                                    Loading ...
                                </Title>
                            </Col>
                        )}
                        {isError && (
                            <Col>
                                <Title type="danger">ERROR</Title>
                            </Col>
                        )}
                        {isSuccess && (
                            <>
                                {data.map((item: TypeTovar, index: number) => {
                                    console.log(item)
                                    return (
                                        <Col key={item.id}>
                                            <Card hoverable style={{ width: "100%" }} cover={<img className={CompModule.card__image} alt="example" width={300} height={300} src={arrayImages[index]} />}>
                                                <Meta title={item.name} description={`ShoppingCart (TypeScript) + ${applicationType === "/libary" ? "react-use-cart" : "redux"}`} />
                                                {(function () {
                                                    if (applicationType === "libary") {
                                                        if (items.length) {
                                                            return (
                                                                <>
                                                                    <Button type="primary">Count +</Button>
                                                                    <Text>{items.length}</Text>
                                                                    <Button type="primary">Count -</Button>
                                                                </>
                                                            )
                                                        } else {
                                                            return (
                                                                <Button className={CompModule.card__btn} type="primary">+ Add To Cart</Button>
                                                            )
                                                        }
                                                    } else if (applicationType === "redux") {
                                                        if(shoppingCart?.some((tovar:TypeTovar) => tovar.id === item.id && tovar.quantity > 0)){
                                                            let tovar = shoppingCart?.find((tovar:TypeTovar) => tovar.id === item.id) as TypeTovar
                                                            console.log(tovar)
                                                            return(
                                                                <>
                                                                <div className={CompModule.card__box}>
                                                                <Button  onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleTovarCount(event, tovar, "inc")} type="primary">Count +</Button>
                                                                <Text>{tovar.quantity}</Text>
                                                                <Button onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleTovarCount(event, tovar, "dec")} type="primary">Count -</Button>
                                                                </div>
                                                                </>
                                                            )
                                                        }else if(!shoppingCart?.some((tovar:TypeTovar) => item.id === tovar.id)){
                                                            return(
                                                                <Button className={CompModule.card__btn} onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleAddCart(event, item)} type="primary">+ Add to cart</Button> 
                                                            )
                                                        }
                                                    }
                                                }())}
                                            </Card>
                                        </Col>

                                    )
                                })}
                            </>
                        )}
                    </Row>
                </Container>
            </Layout>
        </>
    )
}