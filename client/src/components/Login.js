// import { ResultType } from "@remix-run/router/dist/utils";
import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
 

    //will prevent to access login without the logut
    useEffect(()=>{
        const auth=localStorage.getItem("user");
        if(auth)
        {
            navigate("/");
        }
    })
    const navigate=useNavigate();
    const handleLogin= async()=>{
        console.log(email,password);
        let result=await fetch("http://localhost:8000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result=await result.json();
        console.log(result)
        if(result.name)
        {
            localStorage.setItem("user",JSON.stringify(result));
            navigate("/");

        }
        else{
            alert("please enter the valid details ")
        }
    }
    return (
      <div className="login">
        <input className="inputBox" type="text" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <input className="inputBox" type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password} />
        <button onClick={handleLogin} className="loginBotton" type="button"> login</button>
      </div>  
    )
}
export default Login ;