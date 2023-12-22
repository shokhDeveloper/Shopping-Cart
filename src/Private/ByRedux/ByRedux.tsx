import ComponentModue from "../comp.module.css";
import React, { useCallback, useContext, useEffect } from "react";
import {  HeaderApp, Layout } from "../../Components";
import {  Col, FloatButton, Row } from "antd";
import {  Outlet } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"
import { Context, InitialStateInterface, TypeTovar, myContext, useBack } from "../../Settings";
import { useSelector } from "react-redux";

export const ByRedux: React.FC = (): JSX.Element => {
    const {shoppingCart}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const {sumItems, setSumItems}:myContext = useContext(Context)
    const { back, type } = useBack(true)
    const handleClick = (): void => {
        console.log("ishladi")
    }
    useEffect(() => {
        if (type) {
            back()
        }
    }, [type])

    return (
        <Layout>
            <HeaderApp>
                <Col span={1}>
                    <FloatButton.Group type="primary" shape="circle" style={{ top: "1rem" }}>
                       {shoppingCart?.length ? (
                           <FloatButton icon={<FaShoppingCart />} onClick={handleClick} type="primary" badge={{ count: shoppingCart?.length }} />
                       ): ""}
                    </FloatButton.Group>
                </Col>
            </HeaderApp>
            <Outlet />
        </Layout>
    )
} 