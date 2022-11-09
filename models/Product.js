const  mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;


const productSchema = mongoose.Schema(
  {
  name:{
    type:String,
    required: [true , "Please provide a name for this product"],
    trim:true,
    unique:[true ,"Name must be unique"],
    lowercase:true,
    minLength:[3,"Name must be at least 3 characters"],
    maxLength:[100,"Name is too long"]
  },
  description:{
    type:String,
    required:true
  },
  unit:{
    type:String,
    required:true,
    enum:{
      values:["kg","litter","pcs","bag"],
      message:"unit value can't be  {VALUE} , must be kg/liter/pcs/bag",
      validate:{
        validator: (value) =>{
          const isInteger = Number.isInteger(value);
          if(isInteger){
            return true
          }else{
            return false
          }
        }
      },
      message:"Qunatity must be integer"
    }
  },
  imageURLs:[{
    type:String,
    required:true,
    validate:{
      validator: (value) =>{
        if(!Array.isArray(value)){
          return false
        }
        let isValid = true;
        value.forEach(url =>{
          if(!validator.isURL(url)){
            isValid= false
          }
        });
        return isValid;
      },
      message:"Please provide valid url"
    }
  }],
  category:{
    type:String,
    required:true
  },
  brand:{
    name:{
      type:String,
      required:true
    },
    id:{
      type:ObjectId,
      ref:"Brand",
      required:true
    }
  }
},{
  timestamp:true
})

// middleware
productSchema.pre('save',function(next){
  console.log('Before data save');
  if(this.quantity == 0 ){
    this.status = 'Out-of-stock'
  }

  next();

});


// productSchema.post('save',function(doc,next){
//   console.log('After data save')
// next()
// });

productSchema.methods.logger = function(){
  console.log(`Data save for ${this.name}`)
}



//Schema => model => logic
// Model
 const Product = mongoose.model('Product' , productSchema);

module.exports =Product