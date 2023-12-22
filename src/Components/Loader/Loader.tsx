import loaderModule from "./loader.module.css"
import { Col, Row } from "antd";
import React from "react";
import {Oval} from "react-loader-spinner"
export const Loader:React.FC = ():JSX.Element => {
    return(
        <Row className={loaderModule.load} align={"middle"} justify={"center"}>
            <Col className={loaderModule.load__box} span={24} >
            <Oval color="#fff" secondaryColor="aqua" height={80} width={80}/>
            </Col>
        </Row>
    )
}