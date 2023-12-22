import { Button, Col, Form, Input, Row } from "antd";
import React, { SetStateAction, useEffect } from "react";
import { InitialStateInterface, ServerResponse, TypeGooglePassword, UserType, setGoogleUser, setToken, setUser, useLoader } from "../../Settings";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
interface AuthenticationInterface  {
    type: string,
    modal: boolean,
    setModal: React.Dispatch<SetStateAction<boolean>>
}
export const Authentication:React.FC<AuthenticationInterface> = ({type, modal, setModal}):JSX.Element => {
    const {googleUser}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const dispatch = useDispatch()
    const {openLoader} = useLoader()
    const navigate = useNavigate()
    const handleSub = async (event:TypeGooglePassword):Promise<void> => {
        if(event.password.length){
            let user:UserType = {
                name: googleUser?.displayName?.split(" ")[0],
                lastname: googleUser?.displayName?.split(" ")[1],
                email: googleUser?.email as string,
                password: event.password,
            }
            dispatch(setGoogleUser(user))
        }
    }
    useEffect(() => {
        if(googleUser?.password && googleUser?.email){
            ;(async function(){
                try{
                    const request = await axios.post(process.env.REACT_APP_SERVER + `/${type}`, googleUser)
                    if(request?.status === 200 || request?.status === 201){
                        const response:ServerResponse = await request.data
                        if(response?.accessToken){
                            dispatch(setToken(response?.accessToken))
                            dispatch(setUser(response.user))
                            navigate("/")
                            openLoader()
                            window.location.reload()
                        }
                    
                    }
                }catch(error){
                    return Promise.reject(error)
                } 
            }())
        }
    },[googleUser])
    return(
        <Row justify={"center"} align={"middle"}>
            <Col span={20}>
                <Form onFinish={handleSub} style={{textAlign: "center"}} layout="vertical">
                    <Form.Item style={{textAlign: "start"}} label={"Password"} name={"password"} id="password" rules={[
                        {
                            required: true
                        },
                        {
                            min: 5,
                            max: 15,
                            message: "Please enter your password"
                        }
                    ]}>
                        <Input.Password name="password" id="password"/>
                    </Form.Item>
                    <Button htmlType="submit" type="primary">Submit</Button>
                </Form>
            </Col>
        </Row>
    )
}