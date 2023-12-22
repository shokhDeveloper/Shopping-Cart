import React, { useEffect } from "react";
import { HeaderApp } from "../../Components";
import { Col, FloatButton, Row } from "antd";
import { FaShoppingCart } from "react-icons/fa";
import { InitialStateInterface, useBack } from "../../Settings";
import { removeItem } from "../../Settings/utils";
import { useSelector } from "react-redux";
import { useCart } from "react-use-cart";
export const ByLibary: React.FC = (): JSX.Element => {
    const { back, type } = useBack(true)
    const {items} = useCart()
    const handleClick = () => {
        // console.log("ishladi")
    }
    useEffect(() => {
        if (type) {
            back()
        }
    }, [type])
    // useEffect(() => {
    //     removeItem("application-shopping-cart")
    // }, [])
    return (
        <>
            <HeaderApp>
                <Col span={1}>
                    <FloatButton.Group type="primary" shape="circle" style={{ top: "1rem" }}>
                        {items?.length ? (
                            <FloatButton icon={<FaShoppingCart />} onClick={handleClick} type="primary" badge={{ count: 5 }} />
                        ): ""}
                    </FloatButton.Group>
                </Col>
            </HeaderApp>

        </>
    )
}