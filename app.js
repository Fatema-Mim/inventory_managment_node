const express = require("express");
const app = express();
const cors = require("cors");
const  mongoose = require("mongoose");
const productRoute = require('./routes/product.route')
 

app.use(express.json());
app.use(cors());
// schema design 

app.use("/api/v1/product",productRoute );

app.get('/',(req,res)=>{
  console.log('running')
})

module.exports = app;