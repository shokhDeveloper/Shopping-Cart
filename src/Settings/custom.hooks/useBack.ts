import { useEffect } from "react"
import { useNavigate } from "react-router"
interface useBackFC {
    back: (event?: KeyboardEvent) => void;
    type: boolean;
}
export const useBack = (type: boolean):useBackFC => {
    const navigate = useNavigate()
    const handleKey = (event?:KeyboardEvent) => {
        if(event?.key === "Escape" && type){
            navigate(-1)
        }
    }
    useEffect(() => {
        if(type){
            window.addEventListener("keyup", handleKey)
            return () => window.removeEventListener("keyup", handleKey)
        }
    },[type])
    return {back: handleKey, type}
}