import { Button, Col, Form, Input, Row } from "antd";
import React, { useContext, useEffect } from "react";
import { Authentication, Container, GoogleAuth, Modal } from "../../Components";
import Title from "antd/es/typography/Title";
import { Context, FormValues, InitialStateInterface, ServerGoogleResponse, ServerResponse, myContext, setGoogleUser, setToken, setUser, useBack } from "../../Settings";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {signInWithPopup} from "firebase/auth"
import { GoogleProvider, auth } from "../../Settings/firebase/firebase.config";
export const Register:React.FC = ():JSX.Element => {
    const {googleUser}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const {back, type} = useBack(true)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSub = async (event:FormValues):Promise<void> => {
        try{
            const request = await axios.post(process.env.REACT_APP_SERVER + "/register", event)
            if(request?.status === 201){
                const response:ServerResponse = await request.data
                if(response.accessToken){
                    dispatch(setToken(response.accessToken))
                    dispatch(setUser(response.user))
                    window.location.reload()
                }
            } 
        }catch(error){
            return Promise.reject(error)
        }
    }
  
    useEffect(() => {
        if(type){
            back()
        }
    },[type])
    return(
        <>
        <Container>
            <Row justify={"center"} align={"middle"} style={{minHeight: "80vh"}}>
                <Col span={6} style={{textAlign: "center"}}>
                    <Title level={2}>
                        Register
                    </Title>
                    <Form onFinish={handleSub} layout="vertical">
                        <Form.Item style={{textAlign: "start"}}  id="name" label="Name" name={"name"} rules={[
                            {
                                type: "string"
                            },
                            {
                                required: true,
                                message: "Please enter your name"
                            }
                        ]}>
                            <Input id="name" name="name"/>
                        </Form.Item>
                        <Form.Item style={{textAlign: "start"}} label={"Lastname"} name={"lastname"} rules={[
                            {
                                type: "string"
                            },
                            {
                                required: true,

                                message: "Please enter your lastname"
                            }
                        ]}>
                            <Input name="lastname"/>
                        </Form.Item>
                        <Form.Item style={{textAlign: "start"}} label="Email" name={"email"}  rules={[
                            {
                                type: "email"
                            },
                            {
                                required: true,
                                message: "Please enter your email"
                            }
                        ]}>
                            <Input name="email"/>
                        </Form.Item>
                        <Form.Item style={{textAlign: "start"}} label={"Password"} name={"password"}  rules={[
                            {
                                type: "string",
                                min: 5,
                                max: 12
                            },
                            {
                                required: true,
                                message: "Please enter your lastname"
                            }
                        ]}>
                            <Input name="password"/>
                        </Form.Item>
                        <Button htmlType="submit" type="primary">Submit</Button>
                        <Button onClick={() => navigate("/login") }  type="link">Do you have an account?</Button>
                        <GoogleAuth type="register" />
                    </Form>
                </Col>
            </Row>

        </Container>
        </>
    )
} 