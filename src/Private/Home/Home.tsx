import React, { useEffect } from "react";
import { Header, Layout } from "../../Components";
import { Outlet, useLocation } from "react-router";
import { DefaultConduct } from "../DefaultConduct";

export const Home: React.FC = (): JSX.Element => {
    return (
        <>
            <Layout>
                <Header />
                <DefaultConduct />
            </Layout>
        </>
    )
}