const mongoose = require("mongoose");
const dotenv = require("dotenv").config();


function dbConnect(){
    mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
        console.log(`Database is connected`)
    })
}
module.exports = dbConnect