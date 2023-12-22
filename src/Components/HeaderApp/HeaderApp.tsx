import HeaderModule from "./header.module.css";
import React from "react";
import { Header as AntdHeader } from "antd/es/layout/layout";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";
interface HeaderAppProps {
    children: React.ReactNode
}
export const HeaderApp: React.FC<HeaderAppProps> = ({ children }): JSX.Element => {
    return (
        <AntdHeader className={HeaderModule.application__header}>
            <Row justify={"space-between"} align={"middle"} style={{ height: "auto" }}>
                <Col className={HeaderModule.application__col} span={3}  >
                    <NavLink className={({ isActive }) => isActive ? HeaderModule.link.concat(" link__active") : HeaderModule.link} to={"home"}>
                        Home
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? HeaderModule.link.concat(" link__active") : HeaderModule.link} to={"about"}>
                        About
                    </NavLink>
                    <NavLink className={({ isActive }) => isActive ? HeaderModule.link.concat(" link__active") : HeaderModule.link} to={"store"}>
                        Store
                    </NavLink>
                </Col>
                {children}
            </Row>
        </AntdHeader>
    )
}