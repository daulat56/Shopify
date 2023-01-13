import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';

const Home=()=> {
    const [products, setProducts]=useState([]);

    useEffect(()=>{
        getProducts();
    },[])
 
    //to fecth the api of the products database
    
    const getProducts=async()=>{
        let result=await fetch('http://localhost:8000/products');
        result=await result.json();
        setProducts(result);
    }
    //first fecth the product api 
    //use the method delete
    //send the response in json format
    const deleteProduct= async(id)=>{
      let result= await fetch(`http://localhost:8000/product/${id}`,{
        method:"Delete"
      });
      result=await result.json();
      if(result)
      {
        alert("product is deleted");
        getProducts();// as we need to refresh again again after the deleteing to refresh page table so call the getproduct will will update the table simultaneously
      }
      
    }

    //to handle the search bar 
    const searchHandle=async (event)=>{
      let key=event.target.value;
      if(key){
        let result = await fetch(`http://localhost:8000/search/${key}`);
        result=await result.json();
        if(result)
        {
          setProducts(result);
        }
        else
        {
          getProducts();
        }
      }
    }
  return (
    <div className="product-List">
      <h1>products </h1>
      <input type="text" className='search-box' placeholder='search product' onChange={searchHandle} />
      <ul>
        <li>S.N</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operations</li>
      </ul>
{/* to map the functions which will protect from repeated entry from own*/}
      {
        products.length>0 ? products.map((item, index)=>
            <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>
                  <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                  <Link to ={"/update/"+item._id}>Update</Link>
                  </li>


            </ul>
        )
        :<h2>No result found</h2>
      }
    </div>
  )
}

export default Home
