import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { ByLibary, ByRedux, DefaultConduct, Home, Store } from "./Private";
import { getItem } from "./Settings/utils";
import { Login, PublicHome, Register } from "./Public";
const token = getItem("application-token");
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {token ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="by-redux/*" element={<ByRedux />}>
            <Route index element={<Store/>} />
            <Route path="home" element={<Store/>}/>
            <Route path="store" element={<Store/>} />
            <Route path="about" element={<Store/>} />
          </Route>
          <Route path="by-libary/*" element={<ByLibary />}>
            <Route index element={<Store/>} />
            <Route path="store" element={<Store/>} />
            <Route path="home" element={<Store/>}/>
            <Route path="abou/*" element={<Store/>} />
          </Route>
        </>
      ) : (
        <>
          <Route path="/*" element={<PublicHome />}>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </>
      )}
    </>
  )
);
