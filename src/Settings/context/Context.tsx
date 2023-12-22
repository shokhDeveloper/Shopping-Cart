import React, { createContext, useState } from "react"
export interface myContext {
    googleModal: boolean,
    setGoogleModal: React.Dispatch<React.SetStateAction<boolean>>,
    sidebar: boolean,
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    sumItems: number,
    setSumItems: React.Dispatch<React.SetStateAction<number>>
}
export const Context =  createContext<myContext | any>(null)
interface ContextProps {
    children: React.ReactNode
}
export const ContextProvider:React.FC<ContextProps> = ({children}):JSX.Element => {
    const [googleModal, setGoogleModal] = useState<boolean>(false)
    const [sidebar, setSidebar] = useState<boolean>(false)
    const [sumItems, setSumItems] = useState<number>(0)
    const MyContext:myContext = {
        googleModal,
        setGoogleModal,
        sidebar,
        setSidebar,
        sumItems, 
        setSumItems
    }
    return(
        <Context.Provider value={MyContext}>
            {children}
        </Context.Provider>
    )
}