const Product = require('../models/ProductModel');
//const bcrypt = require('bcrypt');


const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, counInStock, rating, description } = newProduct;
        try {

            const checkProduct = await Product.findOne({
                 name: name 
            });
            if (checkProduct !== null) {
                resolve({
                    status: 'Err',
                    message: 'Tên sản phẩm đã tồn tại'
                });
            }

            const newProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                counInStock, 
                rating, 
                description
            })
            if (newProduct) {
                resolve({
                    status: 'Ok',
                    message: 'Success!',
                    data: newProduct
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({ _id: id })
            if (checkProduct === null) {
                resolve({
                    status: 'Err',
                    message: 'Product not found'
                });
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'Ok',
                message: 'Success!',
                data: updatedProduct
            })


        } catch (e) {
            reject(e);
        }
    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'Err',
                    message: 'Product not found'
                });
            }
            
            resolve({
                status: 'Ok',
                message: 'success!',
                data: product
            })


        } catch (e) {
            reject(e);
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'Err',
                    message: 'Product not found'
                });
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'Ok',
                message: 'Delete product success!'
            })


        } catch (e) {
            reject(e);
        }
    })
}

const getAllProduct = (limit = 8, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments()
            const allProduct = await Product.find().limit(limit).skip(page * limit)
            resolve({
                status: 'Ok',
                message: 'success!',
                data: allProduct,
                total : totalProduct,
                pageCurren: Number(page +1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}


module.exports = {
    createProduct,
    updateProduct,
    getDetailProduct,
    deleteProduct,
    getAllProduct
}