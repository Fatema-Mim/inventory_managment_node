const  mongoose = require("mongoose");
const validator = require("validator")
const {ObjectId} = mongoose.Schema.Types;

const categorySchema = mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true, "Please provied a category name"],
        lowercase:true,
        unique:true
    },
    discription:String,
    imageUrl:{
        type:String,
        validator:[validator.isURL , "please provied a valid URL"]
    }
},{
    timestamp:true
});

const Category = mongoose.model("Category" , categorySchema)

module.exports = Category 

