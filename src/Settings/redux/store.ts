import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "./combine";
export const store = configureStore({
    reducer: RootReducer
})