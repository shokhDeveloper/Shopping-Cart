import { Button } from "antd";
import { signInWithPopup } from "firebase/auth";
import React, { useContext, useEffect } from "react";
import { GoogleProvider, auth } from "../../Settings/firebase/firebase.config";
import { Context, InitialStateInterface, ServerGoogleResponse, myContext, setGoogleUser } from "../../Settings";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../Modal";
import { Authentication } from "../Authentication";
interface GoogleAuthprops {
    type: string
}
export const GoogleAuth: React.FC<GoogleAuthprops> = ({type}): JSX.Element => {
    const {googleUser}:InitialStateInterface = useSelector(({Reducer}) =>Reducer)
    const {googleModal, setGoogleModal}:myContext = useContext(Context)

    const dispatch = useDispatch()
    const handleGoogle = (event: React.MouseEvent<HTMLButtonElement>): void => {
        signInWithPopup(auth, GoogleProvider).then((response) => {
            const user: ServerGoogleResponse = response.user
            if (user.email) {
                let userGoogle: ServerGoogleResponse = {
                    displayName: user.displayName,
                    email: user.email,
                    password: null
                }
                dispatch(setGoogleUser(userGoogle))
            }
        })
    }
    useEffect(() => {
        if(googleUser?.email && !googleUser?.password){
            setGoogleModal(true)
        }
    },[googleUser])
    return (
        <>
            <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleGoogle(event)} type="default" style={{ marginTop: "1rem" }}>Continue with google </Button>
            <Modal modal={googleModal} setModal={setGoogleModal} title={"Enter your password !"}>
                <Authentication modal={googleModal} setModal={setGoogleModal} type={type}/>
            </Modal>
        </>
    )
}