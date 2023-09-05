// import { ResultType } from "@remix-run/router/dist/utils";
import React, { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import styles from "./styles/login.module.css"

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
      <div className={styles.loginPage}>
        <div className={styles.loginWrapper}>
          <span>Login</span>
          <input className={styles.inputBox} type="text" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
          <input className={styles.inputBox} type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password} />
          <button onClick={handleLogin} className={styles.loginButton} type="button"> login</button>
        </div> 
      </div>
    )
}
export default Login ;