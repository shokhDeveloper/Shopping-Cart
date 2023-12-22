import React, { SetStateAction, useState } from "react";
import { Modal as AntdModal, Button } from "antd";
interface ModalProps {
    modal: boolean;
    setModal: React.Dispatch<SetStateAction<boolean>>,
    title: string,
    children: React.ReactNode
}
export const Modal:React.FC<ModalProps> = ({modal, setModal, title, children}):JSX.Element => {
    
    return(
        <AntdModal  title={title} open={modal} onOk={() => setModal(true)} footer={[
            <Button  onClick={() => setModal(false)}>Cencel</Button>
        ]}>
            {children}        
         </AntdModal>
    )
}