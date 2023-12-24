import React, { useContext, useEffect } from "react";
import { Bar, HeaderApp, Layout } from "../../Components";
import { Col, FloatButton, Row } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { Context, InitialStateInterface, myContext, useBack } from "../../Settings";
import { removeItem } from "../../Settings/utils";
import { useSelector } from "react-redux";
import { useCart } from "react-use-cart";
import { Outlet } from "react-router-dom"
export const ByLibary: React.FC = (): JSX.Element => {
    const { back, type } = useBack(true)
    const { items } = useCart()
    const {barOverlay, setBarOverlay}:myContext = useContext(Context)
    const handleClick = () => {
        setBarOverlay(true)
    }
    useEffect(() => {
        if (type) {
            back()
        }
    }, [type])
    useEffect(() => {
        removeItem("application-shopping-cart")
    }, [])
    return (
        <>
        <Layout>
            <HeaderApp>
                <Col span={1}>
                    <FloatButton.Group type="primary" shape="circle" style={{ top: "1rem" }}>
                        {items?.length ? (
                            <FloatButton icon={<FaShoppingCart />} onClick={handleClick} type="primary" badge={{ count: items.length as number }} />
                        ) : ""}
                    </FloatButton.Group>
                </Col>
            </HeaderApp>
        <Outlet/>
            <Bar/>
        </Layout>
        </>
    )
}