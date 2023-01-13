import React ,{useState,useEffect} from 'react';
import {useParams , useNavigate} from 'react-router-dom';

const UpdateProduct=()=> {
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]= useState('');
    const [company,setCompany]=useState('');
    const params=useParams(); //to get the id of the user
    const navigate=useNavigate(); //to readact aur navigate to any particular page
    useEffect(()=>{
        getProductDetails();
    },[])

//to get the product detail from the database of products in the update table
    const getProductDetails=async()=>{
        let result=await fetch(`http://localhost:8000/product/${params.id}`);
        result=await result.json();
        console.log(result);
        setName(result.name); // to automatically update the name and other element in update table
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
//to connect the update page with the api
    const updateProduct=async()=>{
        console.log({name, price, company, category});
        let result=await fetch(`http://localhost:8000/product/${params.id}`,
        {
            method:"Put",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'content-type':"application/json"
            }
        });
        result=await result.json();
        console.log(result);
        navigate("/");

    }
  return (
    <div className='product'>
            <h1>Update Products</h1>
            <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter product name' />
           
            <input className='inputBox' type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter product price' />
            
            <input className='inputBox' type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter product category' />
            
            <input className='inputBox' type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter product company' />

            <button onClick={updateProduct} className='add-button'>update</button>
        </div>
  )
}

export default UpdateProduct;