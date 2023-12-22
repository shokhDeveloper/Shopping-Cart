import styled, {createGlobalStyle} from "styled-components"
export const GlobalStyle = createGlobalStyle`
    *::before, *::after, *{
        box-sizing: border-box;
    }
    body{
        margin: 0;
        padding: 0;
    }
    .container{
        width: 1450px;
        padding: 0 20px;
        margin: 0 auto;
    }
    .border-transparent{
        border: 1px solid transparent;
        outline: 1px solid transparent;
    }
`
export const Button = styled.button`
    padding: 0.5rem 1rem;
`
