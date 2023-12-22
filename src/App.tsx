import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./Routes";
import React, { useEffect } from "react";
import { GlobalStyle, InitialStateInterface, setApplicationType, useLoader } from "./Settings";
import { Loader, Modal } from "./Components";
import { useDispatch, useSelector } from "react-redux";

export const App:React.FC = ():JSX.Element =>  {
  const {loader, applicationType}:InitialStateInterface = useSelector(({Reducer}) => Reducer)
  const {openLoader} = useLoader()
  const dispatch = useDispatch()
  useEffect(() => {
    if(loader){
      openLoader()
    }
  },[])
  
  return (
    <div className="App"  >
      {loader ? (
        <Loader/>
      ) : (
      <RouterProvider router={router}/>     
      )}
      <GlobalStyle/>
    </div>
  );
}

export default App;