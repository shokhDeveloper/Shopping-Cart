import { PayloadAction } from "@reduxjs/toolkit";  
import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../utils";
import { ServerGoogleResponse, TypeTovar, UserType } from "../Types";
import Book from "../assets/images/book.jpg";
import Computer from "../assets/images/computer.jpg";
import Banana from "../assets/images/banana.jpg";
import Car from "../assets/images/car.jpg"
type GenericsValue<T> = T | null
export interface InitialStateInterface {
    token: GenericsValue<string>,
    user: GenericsValue<UserType>,
    loader: boolean,
    googleUser: ServerGoogleResponse | UserType | null,
    applicationType: GenericsValue<string>,
    shoppingCart: TypeTovar[],
    tovars: TypeTovar[] | [],
    arrayImages: string[]
}
const initialState:InitialStateInterface = {
    token: getItem("application-token") ? getItem("application-token") : null,
    user: getItem("application-user")? JSON.parse(getItem("application-user")!) : null,
    loader: getItem("application-loader") ? false: true,
    googleUser: null ,
    applicationType: null,
    shoppingCart: getItem("application-shopping-cart") ? JSON.parse(getItem("application-shopping-cart")!): [],
    tovars: [],
    arrayImages: [Book, Computer, Banana, Car ]
}
export const slice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        setToken(state, action:PayloadAction<string>){
            state.token = action.payload
            setItem("application-token", state.token)
        },
        setUser(state, action:PayloadAction<UserType>){
            state.user = action.payload
            setItem("application-user", state.user)
        },
        setOpenLoader(state, action:PayloadAction<boolean>){
            state.loader = action.payload
            removeItem("application-loader")
        },
        setCloseLoader(state, action:PayloadAction<boolean>){
            state.loader = action.payload
            setItem("application-loader", "loader-the-end")
        },
        setGoogleUser(state, action:PayloadAction<ServerGoogleResponse | UserType>){
            state.googleUser = action.payload
        },
        setApplicationType(state, action:PayloadAction<string>){
            state.applicationType = action.payload
        },
        setTovars(state, action:PayloadAction<TypeTovar[]>){
            state.tovars = action.payload
        },
        setAddTovar(state, action:PayloadAction<TypeTovar>){
            if(state.shoppingCart?.length){
                if(!state.shoppingCart?.some((item:TypeTovar) => item.id === action.payload.id)){
                    state.shoppingCart = [...state.shoppingCart, action.payload]
                }else{
                    state.shoppingCart = state.shoppingCart
                }
            }else{  
                state.shoppingCart = [...state.shoppingCart, action.payload]
                setItem("application-shopping-cart", state.shoppingCart)
            }
        },
        setTovarIncCount(state, action:PayloadAction<TypeTovar>){
            try{
                let idx = state.shoppingCart.findIndex((item:TypeTovar) => item.id === action.payload.id);
               let clone:string = JSON.stringify(state.shoppingCart)
               let parseShoppingCart:TypeTovar[] = JSON.parse(clone) 
               if(parseShoppingCart[idx].quantity){
                   parseShoppingCart[idx].quantity += 1
                   state.shoppingCart = parseShoppingCart
                   setItem("application-shopping-cart", state.shoppingCart)
               }
            }catch(error){
                console.log(error)
            }
        },
        setTovarDecCount(state, action:PayloadAction<TypeTovar>){
            try {
                const idx = state.shoppingCart.findIndex(
                  (item: TypeTovar) => item.id === action.payload.id
                );
            
                if (state.shoppingCart[idx].quantity > 1) {
                  const updatedShoppingCart = state.shoppingCart.map((item) =>
                    item.id === action.payload.id
                      ? { ...item, quantity: item.quantity - 1 }
                      : item
                  );
                  state.shoppingCart = updatedShoppingCart;
                  setItem("application-shopping-cart", updatedShoppingCart);
                }else{
                  state.shoppingCart = state.shoppingCart.filter((item:TypeTovar) => item.id !== action.payload.id);
                  setItem("application-shopping-cart", state.shoppingCart);
                
                }
              } catch (error) {
                console.log(error);
              }
        },
        setDeleteTovar(state, action:PayloadAction<TypeTovar>){
            state.shoppingCart = state.shoppingCart.filter((item:TypeTovar) => item.id !== action.payload.id)
        }
    }
})
export const {setToken, setUser, setCloseLoader, setOpenLoader, setGoogleUser, setApplicationType, setTovars, setAddTovar, setTovarDecCount, setTovarIncCount, setDeleteTovar}  = slice.actions
export const Reducer = slice.reducer