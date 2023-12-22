import { Button, Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setApplicationType } from "../../Settings";

export const DefaultConduct: React.FC = (): JSX.Element => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    return (
        
        <Row justify={"center"} align={"middle"} style={{minHeight: "88vh"}}>
            <Col span={24} style={{textAlign: "center"}}>
                <Button style={{marginRight: "0.5rem"}} type="primary" onClick={() => navigate("/by-libary")}>Through the library use</Button>
                <Button type="primary" onClick={() => navigate("/by-redux")}>Using the application through Redux</Button>
            </Col>
        </Row>
    )
}