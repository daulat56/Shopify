import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styles from "./styles/add.module.css"

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const product = async () => {

    // to validate the name company etc
    if (!name || !price || !category || !company) //if any of them will be false
    {
      setError(true);
      return false;
    }
    console.log({ name, price, category, company });
    const userId = JSON.parse(localStorage.getItem('user'))._id; //to fetch then id of the user
    let result = await fetch('http://localhost:8000/add-product', {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  }

  return (
    <div className={styles.addProductPage}>

      <div className={styles.addProduct}>
        <h2>Add Products</h2>
        <input className={styles.inputBox} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter product name' />
        {/* if there is any error in the respective element then will shoe the error statement else nothing */}
        {error && !name && <span className='invalid-input'> Enter the valid name</span>}
        <input className={styles.inputBox} type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Enter product price' />
        {error && !price && <span className='invalid-input'> Enter price</span>}
        <input className={styles.inputBox} type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Enter product category' />
        {error && !category && <span className='invalid-input'> Enter the valid category</span>}
        <input className={styles.inputBox} type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder='Enter product company' />
        {error && !company && <span className='invalid-input'> Enter the valid company</span>}


        <button onClick={product} className={styles.addbutton}>Add</button>
      </div>
    </div>
  )

}
export default AddProduct;