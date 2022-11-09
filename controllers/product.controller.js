const { getPtoductService, createProductService, updateProductService, bulkUpdateProductService,deleteProductServiceById, bulkDeletedProductService,createMultipleProductService } = require("../services/product.services")

exports.getProduct =  async (req, res,next) => {
  // res.send("Route is working! YaY!");
  try {
    // get all data without any query
    // const products = await getPtoductService(req.query)
    // ==== with a lot of quries=====
    let filters = {...req.query};
    const excludeFields = ['sort','page','limit'];
    excludeFields.forEach(field => delete filters[field]);

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match=> `$${match}`)

    filters = JSON.parse(filterString)

    const quries = {};
    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ')
      quries.sortBy = sortBy
      console.log(sortBy)
    };

    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ')
      quries.fields = fields
      console.log(fields)
    }
     if(req.query.page){
      const {page = 1 , limit=5} = req.query

      const skip = (page - 1) * parseInt(limit);
      quries.skip = skip;
      quries.limit = parseInt(limit)
     }
    
    // console.log(filters)
    const products = await getPtoductService(filters,quries)


    res.status(200).json({
      status:'Success',
      message:'Get all data',
      data:products
    })

    
  } catch (error) {
    res.status(400).json({
      status:'Failed',
      message:"cannot get data",
      error:error.message
    })
    
  }
}
exports.createProduct =  async (req,res,next) =>{
  // res.send('Its working')
  // console.log(req.body)
  try {
    const result = await createProductService(req.body)
    result.logger();

    res.status(200).json({
      status: 'success',
      message:'Data Insert Successfully',
      data: result
    })

  } catch (error) {
    res.status(400).json({
      status:'failed',
      message:'Data is not inserted',
      error:error.message
    })
  }
}
exports.createMultipleProduct =  async (req,res,next) =>{
  // res.send('Its working')
  // console.log(req.body)
  try {
    const result = await createMultipleProductService(req.body)

    res.status(200).json({
      status: 'success',
      message:'Data Insert Successfully',
      data: result
    })

  } catch (error) {
    res.status(400).json({
      status:'failed',
      message:'Data is not inserted',
      error:error.message
    })
  }
}

exports.updateProduct = async (req,res,next) =>{
  try {
    const {id} = req.params;
    const result = await updateProductService(id,req.body)

    res.status(200).json({
      status: 'success',
      message:'Data update Successfully',
      data: result
    })
    
  } catch (error) {
     res.status(400).json({
      status:'failed',
      message:"Couldn't update the product",
      error:error.message
    })
    
  }

};
exports.bulkUpdateProduct = async (req,res,next) =>{
  try {
    const result = await bulkUpdateProductService(req.body)

    res.status(200).json({
      status: 'success',
      message:'Data update Successfully',
      data: result
    })
    
  } catch (error) {
     res.status(400).json({
      status:'failed',
      message:"Couldn't update the product",
      error:error.message
    })
    
  }
};
exports.deleteProductById = async (req,res,next) =>{
  try {
    const {id} = req.params;
    const result = await deleteProductServiceById(id)

    if(!result.deletedCount){
      res.status(200).json({
      status: 'success',
      message:'Data deleted Successfully',
      data: result
    })
    }
    
  } catch (error) {
     res.status(400).json({
      status:'failed',
      message:"Couldn't delete the product",
      error:error.message
    })
    
  }

};
exports.bulkDeleteProduct = async (req,res,next) =>{
  try {
    const result = await bulkDeletedProductService(req.body.ids)

    res.status(200).json({
      status: 'success',
      message:'Given data deleted Successfully',
      data: result
    })
    
  } catch (error) {
     res.status(400).json({
      status:'failed',
      message:"Couldn't delete the given data",
      error:error.message
    })
    
  }
};