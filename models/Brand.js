const  mongoose = require("mongoose");
const validator = require("validator")
const {ObjectId} = mongoose.Schema.Types;

const brandSchema = mongoose.Schema({
    name:{
        type:true,
        required:[true, "Please provied a brand name"],
        maxLength:100,
        unique:true,
        lowercase:true
    },
    discription:String,
    email:{
        type:String,
        validator:[validator.isEmail , "Please provied a valid email"],
        lowercase:true
    },
    website:{
        type:true,
        validator:[validator.isURL, "Please provide a valid URL"]
    },
    location:String,
    products:[{
        type:ObjectId,
        ref:"Product"
    }],
    suppliers:[{
        name:String,
        constactNumber:String,
        id:{
            type:ObjectId,
            ref:"Supplier"
        }
    }],
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    }
    
},
{
    timestamps:true
}
);

const Brand = mongoose.model("Brand",brandSchema);

module.exports = Brand;