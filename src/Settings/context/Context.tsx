import React, { createContext, useState } from "react"
export interface myContext {
    googleModal: boolean,
    setGoogleModal: React.Dispatch<React.SetStateAction<boolean>>,
    sidebar: boolean,
    setSidebar: React.Dispatch<React.SetStateAction<boolean>>,
    sumItems: number,
    setSumItems: React.Dispatch<React.SetStateAction<number>>,
    barOverlay: boolean,
    setBarOverlay: React.Dispatch<React.SetStateAction<boolean>>,
    barActive: boolean,
    setBarActive: React.Dispatch<React.SetStateAction<boolean>>
}
export const Context =  createContext<myContext | any>(null)
interface ContextProps {
    children: React.ReactNode
}
export const ContextProvider:React.FC<ContextProps> = ({children}):JSX.Element => {
    const [googleModal, setGoogleModal] = useState<boolean>(false)
    const [sidebar, setSidebar] = useState<boolean>(false)
    const [sumItems, setSumItems] = useState<number>(0)
    const [barOverlay, setBarOverlay] = useState<boolean>(false)
    const [barActive, setBarActive] = useState<boolean>(false)
    const MyContext:myContext = {
        googleModal,
        setGoogleModal,
        sidebar,
        setSidebar,
        sumItems, 
        setSumItems,
        barOverlay, setBarOverlay,
        barActive, setBarActive
    }
    return(
        <Context.Provider value={MyContext}>
            {children}
        </Context.Provider>
    )
}