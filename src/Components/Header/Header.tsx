import React from "react";
import { Header as AntdHeader} from "antd/es/layout/layout"; 
import { useSelector } from "react-redux";
import { InitialStateInterface } from "../../Settings/redux/slice";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text"
import { Container } from "../Container";
export const Header:React.FC = ():JSX.Element => {
    return(
        <AntdHeader  style={{textAlign: "center", height: "auto", padding: "0" }} >
            <Container>
            <Title level={2} style={{color: "#fff"}}>
                ShoppingCart <Text style={{ marginLeft: "0.5rem", fontSize: "1em", backgroundColor: "#366ad8", padding: "0.3rem", color: "#fff"}}>{"(TypeScript)"}</Text> 
            </Title>
            </Container>
        </AntdHeader>
    )
}