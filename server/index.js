const express=require("express");
const mongoose=require("mongoose");
require('./db/config');
const cors=require('cors');
const User=require("./db/User");
const app=express();
const Product=require("./db/Product");

const Jwt=require("jsonwebtoken");
const jwtKey="e-comm"; //it should be kept secret asothers may also create the same key

app.use(express.json());
app.use(cors());


app.post("/register", async(req,res)=>{
    let user=new User(req.body);
    let result=await user.save();
    //to hide password from the res in database
    result= result.toObject();
    delete result.password;
    res.send(result);
   
})  
 //to fetch the data using email and password
app.post("/login",async(req,res)=>{
    if(req.body.password && req.body.email)
    {
       let user = await User.findOne(req.body).select("-password");
       if(user)
       {
        res.send(user)
       }
       else
       {
        res.send({result:"user not found"});
       }
    }
   
})

app.post("/add-product", async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    res.send(result);
})

//to get the data from the database of products

app.get("/products",async(req,res)=>{
    let products= await Product.find();
    if(products.length>0)
    {
         res.send(products);
    }
    else{
        res.send({result:"No Products found"});
    }
})

app.delete("/product/:id" ,async(req,res)=>{
    // res.send(req.params.id);
    const result=await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get("/product/:id", async(req,res)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result)
    {
        res.send(result);
    }else{
        res.send({result:"not found"});  
    }
})


//to update the data from database we use put nethod
 
app.put("/product/:id",async(req,res)=>{
    let result=await Product.updateOne({_id:req.params.id},
        {
            $set:req.body //will set the requested changes in the original db
        });
        res.send(result);
})

//to make route for the search api

app.get("/search/:key", async(req,res)=>{
    let result=await Product.find({
       "$or":[
        {price:{$regex:req.params.key}},
        {category:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {name:{$regex:req.params.key}}
       ] 
    });
    res.send(result);   
})



app.listen(8000, ()=> console.log("Connected to PORT 8000 "));