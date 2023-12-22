import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InitialStateInterface, setCloseLoader, setOpenLoader } from "../redux";
interface LoaderInterface {
    openLoader:() => void;
}
export const useLoader = ():LoaderInterface => {
    const {loader}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
    const dispatch = useDispatch()
    const openLoader = ():void => {
        dispatch(setOpenLoader(true))
    }
    const closeLoader = ():void => {
        setTimeout(() => {
            dispatch(setCloseLoader(false))
        }, 2000)
    }
    useEffect(() => {
        if(loader){
            closeLoader()
        }
    },[loader])
    return {openLoader}
}