import BarModule from "./bar.module.css";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import React, { useContext, useEffect } from "react";
import { Context, InitialStateInterface, TypeTovar, myContext, setDeleteTovar, setTovarDecCount, setTovarIncCount } from "../../Settings";
import { Button, Col, Divider, Image, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import Text from "antd/es/typography/Text";
export const Bar: React.FC = (): JSX.Element => {
    const { applicationType, shoppingCart, arrayImages }: InitialStateInterface = useSelector(({ Reducer }) => Reducer)
    const { barOverlay, setBarOverlay, setBarActive, barActive }: myContext = useContext(Context)
    const { items, updateItemQuantity, removeItem, cartTotal } = useCart()
    const dispatch = useDispatch()
    const handleBarActive = (type:boolean):void => {
        if(type){
            setTimeout(() => {
                setBarActive(true)
            },300)  
        }else if(!type){
            setBarActive(false)
            setTimeout(() => {
                setBarOverlay(false)
            },300)  
        }
    }
    const handleShoppingCart = (event:React.MouseEvent<HTMLButtonElement>, tovar:TypeTovar):boolean | void => {
        const elButton = event.target as HTMLButtonElement
        switch(elButton.id){
            case "delete":{
                console.log("ishladi")
                dispatch(setDeleteTovar(tovar))                
            }break;
            case "inc":{
                dispatch(setTovarIncCount(tovar))
            }break;
            case "dec":{
                dispatch(setTovarDecCount(tovar))
            }break;
            default: return false
        }
    }
    useEffect(() => {
        if(barOverlay){
            handleBarActive(true)
        }
    }, [barOverlay])
    return (
        <div className={BarModule.bar__overlay?.concat(" overlay")} style={{ display: barOverlay ? "flex " : "none " }}>
            <Sider width={300} className={BarModule.bar__sidebar} style={{ height: "100vh", background: "#fff", transform: `translateX(${barActive ? "0" : "100%"})` }}>
                <div className={BarModule.sidebar__top}>
                    <Title level={5} >
                        Shopping-Cart {`(cartTotal = ${Math.ceil(cartTotal)}$ USD)`}
                    </Title>
                    <Button onClick={() => handleBarActive(false) } type="primary">X</Button>

                </div>
                <Row className={BarModule.bar__inner} justify={"center"}>
                    {applicationType === "redux" ? (
                        <>
                            {shoppingCart?.map((tovar: TypeTovar, index:number) => {
                                return (
                                    <>
                                        <Col className={BarModule.tovar__col}>
                                        <div className={BarModule.tovar}>
                                            <Image className={BarModule.tovar__image} src={arrayImages[index]} />
                                            <div>
                                                <Button onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleShoppingCart(event, tovar)} id="delete" type="primary">Delete</Button>
                                            </div>
                                        </div>
                                        <div className={BarModule.tovar__bottom}>
                                            <Button onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleShoppingCart(event, tovar) } id="inc" type="primary"> + </Button>
                                            <Text>{tovar.quantity}</Text>
                                            <Button onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleShoppingCart(event, tovar)} type="primary" id="dec">-</Button>
                                        </div>
                                    </Col>
                                    <Divider type="horizontal"/>
                                    </>
                                )
                            })}
                        </>
                    ) : applicationType === "libary" ? (
                        <>
                            {items?.map((item: any, index: number) => {
                                return (
                                    <>
                                    <Col className={BarModule.tovar__col}>
                                        <div className={BarModule.tovar}>
                                            <Image className={BarModule.tovar__image} src={arrayImages[index]} />
                                            <div>
                                                <Button onClick={() => removeItem(item.id)} type="primary">Delete</Button>
                                            </div>
                                        </div>
                                        <div className={BarModule.tovar__bottom}>
                                            <Button onClick={() => updateItemQuantity(item.id, item.quantity + 1)} type="primary"> + </Button>
                                            <Text>{item.quantity}</Text>
                                            <Button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} type="primary">-</Button>
                                        </div>
                                    </Col>
                                    <Divider type="horizontal"/>
                                    </>
                                )
                            })}
                        </>
                    ) : ""}
                </Row>
            </Sider>
        </div>
    )
} 