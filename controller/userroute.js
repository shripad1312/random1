const express=require("express");
var route=express.Router();
const url=require("url");

route.get("/:id",(req,res)=>{
 var c=   req.params.id
 console.log(c);
})

