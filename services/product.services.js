const Product = require("../models/Product")

exports.getPtoductService =async (filters,quries) =>{
    const products = await Product.find(filters)
    .skip(quries.skip)
    .limit(quries.limit)
    .select(quries.fields)
    .sort(quries.sortBy)
    const totalProducts = await Product.countDocuments(filters);
    const pageCount = Math.ceil(totalProducts/quries.limit)
    return {totalProducts,pageCount,products};
}

exports.createProductService = async (data) =>{
    const product = new Product(data);
    const result = await product.save();
    return result

};
exports.createMultipleProductService = async (data) =>{
    // const product = new Product(data);
    const result = await Product.insertMany(data);
    return result

} 

exports.updateProductService = async (productId, data) =>{
    const product =await Product.findById(productId);
    const result = await product.set(data).save();
    return result

}
exports.bulkUpdateProductService = async  (data) =>{
    //=== for updading one value for all data
    // const result = await Product.updateMany({_id:data.ids} , data.data,{
    //     runValidators:true
    // })
    const products = [];
    data.ids.forEach(product =>{
        products.push(Product.updateOne({_id:product.id},product.data));
    });
    const result = await Promise.all(products)
    return result;

}
exports.deleteProductServiceById = async (id) =>{
    const result =  await Product.deleteOne({_id:id});
    return result;
};

exports.bulkDeletedProductService = async  (ids) =>{
    const result = await Product.deleteMany({_id:ids});
    return result
}


