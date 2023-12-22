import React from "react";
import { Header, Layout } from "../Components";
import Title from "antd/es/typography/Title";
import { Register } from "./Register";
import { Outlet } from "react-router";

export const PublicHome:React.FC = ():JSX.Element => {
    return(
        <Layout>
            <Header/>
            <Outlet/>
        </Layout>
    )
}