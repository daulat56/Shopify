import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import styles from "./styles/signup.module.css"


const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

//after the authentication process no need to see the signup compo. again
     const navigate=useNavigate();
      useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth)
        {
            navigate('/');
        }
    })

//as it will return promise so need to use async and await
    const collection=async()=>{ //to collect data
        console.log(name,email,password);
        let result=await fetch('http://localhost:8000/register',{
            method:"post",
            body:JSON.stringify({name,email,password}), //as it takes jason string as input
            headers:{'Content-Type':'application/json'},
        }) ;//an api whose first paramerter is url used t fetch in thunderclient

        result=await result.json();
        console.log(result);
        // if(result)
        // {
        //     navigate("/"); //after signup it will navigate to home page
        // }
        // to store the data in the local storage
        // user is the key name and it where the result will be stored in string form
        localStorage.setItem("user",JSON.stringify(result));
        navigate('/');

        // Private component-some component sometimes need to be hidden so need to have some condition



    }


    return (
        <div className={styles.signupPage}>
        <div className={styles.signupWrapper}> 
            <span>Register</span>
            <input className={styles.inputBox} type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name"/>
            <input className={styles.inputBox} type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Email"/>
            <input className={styles.inputBox} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password"/>
            <button onClick={collection} className={styles.signupButton} type="button">Signup</button>
        </div>
        </div>
    );
}

export default Signup;
