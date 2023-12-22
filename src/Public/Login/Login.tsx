import { Button, Col, Form, Input, Row } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { FormValues, ServerResponse, setToken, setUser, useBack } from "../../Settings";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GoogleAuth } from "../../Components";

export const Login:React.FC = ():JSX.Element => {
    const {back, type} = useBack(true)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSub = async (event:FormValues):Promise<void> => {
        try{
            const request = await axios.post(process.env.REACT_APP_SERVER + "/login", event)
            if(request?.status === 200){
                const response:ServerResponse = await request.data
                if(response.accessToken){
                    dispatch(setToken(response?.accessToken))
                    dispatch(setUser(response?.user))
                    window.location.reload()
                }
            }
        }catch(error){
            return Promise.reject(error)
        }
    }
    useEffect(() => {
        if(type){
            back();
        }
    },[type])
    return(
        <Row justify={"center"} align={"middle"} style={{minHeight: "80vh"}}>
            <Col span={6}>
                <Form onFinish={handleSub} layout="vertical" style={{textAlign: "center"}}>
                    <Title level={2}>Login</Title>
                    <Form.Item style={{textAlign: "start"}} label="Email" id="email" name={"email"} rules={[
                        {
                            type: "email"
                        },
                        {
                            required: true,
                            message: "Please enter your email"
                        }
                    ]}>
                        <Input name="email" id="email"/>
                    </Form.Item>
                    <Form.Item style={{textAlign: "start"}} label="Password" id="password" name={"password"} rules={[
                        {
                            required: true,
                            min: 5, 
                            max: 12,
                            message: "Please enter your Password"
                        }
                    ]}>
                        <Input.Password name="password" id="password"/>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Submit</Button>
                    <Button onClick={() => navigate("/register")} type="link" htmlType="button">Don't have an account?</Button>
                    <GoogleAuth type="login"/>
                </Form>
            </Col>
        </Row>       
    )
}