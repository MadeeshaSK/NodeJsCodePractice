const Product = require('../model/ProductSchema');

const saveProduct = async (req, res) => { // admin / manager Only
    try {
        const createdProduct  = new Product (req.body);
        const savedProduct  = await createdProduct .save();
        res.status(201).json({message:"Product  Saved!", data: savedProduct });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct  = async (req, res) => { // admin / manager Only
    try {
        const updatedProduct  = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (updateProduct) {
            return res.status(201).json({message:"Product Updated!", data: updatedProduct  });
        } else {        
            res.status(404).json({ message: 'Product not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => { // admin / manager Only
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (deletedProduct) {
            return res.status(200).json({message:"Product Deleted!", data: deletedProduct });
        } else {
            res.status(404).json({ message: 'Product not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findProduct = async (req, res) => { // admin / manager / user
    try {
        const Product = await Product.findById(req.params.id);
        if (Product) {
            return res.status(200).json({message :"Product Found!", data: Product });
        } else {
            res.status(404).json({ message: 'Product not found!' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const loadAllProducts = async (req, res) => { // admin / manager / user
    try {
        const {searchText, page = 1, size = 10} = req.query;
        const filter = searchText ? {$or:[
            {ProductName: {$regex: searchText, $options: "i"}},
            {description: {$regex: searchText, $options: "i"}}
        ]}: {};
        const ProductList =  await Product.find(filter).skip((page - 1) * size).limit(parseInt(size));
        const total = await Product.countDocuments(filter);
        res.status(200).json({message:"Product List Fetched!", data:{dataList : ProductList, count: total}} );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const findLowStockProducts = async (req, res) => { // admin / manager / user
    try {
        const dataList = await Product.findLowStockProducts();
        res.status(201).json({message:"Low Stock Products Fetched!", data: dataList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    saveProduct,
    updateProduct,
    deleteProduct,
    findProduct,
    loadAllProducts,
    findLowStockProducts
};