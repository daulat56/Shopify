import React from "react";
import {Navigate,Outlet} from 'react-router-dom';


const PvtCom=()=>{
    const auth=localStorage.getItem('user');
    console.log("auth=",auth);
    //outlet will handle the private component work like wraper
    return auth?<Outlet/>:<Navigate to="/login"/>
}
export default PvtCom;