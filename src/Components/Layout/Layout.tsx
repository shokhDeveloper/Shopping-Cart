import React from "react";
import { Layout as AntdLayout } from "antd";
interface LayoutProps {
    children: React.ReactNode
}
export const Layout:React.FC<LayoutProps> =  ({children}):JSX.Element => {
    return(
        <AntdLayout style={{minHeight: "100vh"}}>
            {children}
        </AntdLayout>
    )
}