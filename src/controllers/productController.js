import Product from "../models/productModel.js";

export const getProducts = async (req, res) => {
    try {
        //en los productos tenemos categoria que es un esquema aparte
        //para poder traer dichos datos debemos popular
        const products = await Product.find().populate("category");

        if (products.length === 0){
            return res.status(400).json({ message: "There are no products" })
        }

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const createProduct = async (req, res) => {
    try {
       const productData = new Product (req.body);

       const { name } = productData;

       const productExist = await Product.findOne({name});

       if(productExist){
        return res.status(400).json({ message: `Product ${name} already exists` });
       }

       const savedProduct = await productData.save();
       return res.status(200).json(savedProduct);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const findProductById = async (req, res) => {
    try {
        const _id = req.params.id;

        const productExist = await Product.findOne({ _id });

        if (!productExist){
            return res.status(400).json({message: `Product ${_id} doesnt exist`});
        }
        res.status(200).json({productExist});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const findProductByName = async (req, res) => {
    try {
        const name = req.body.name;

        const parsedName = name.trim().toLowerCase();

        const productExist = await Product.findOne({ name: parsedName });

        if (!productExist){
            return res.status(400).json({message: `Product ${name} doesnt exist`});
        }
        res.status(200).json({productExist});
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const _id  = await req.params.id;
        const productExist = Product.findOne({ _id })
        if (!productExist){
            return res.status(400).json({ message: "User you're trying to update does not exist" });
        }
        const updateProduct = await Product.updateOne({ _id }, req.body);
        return res.status(200).json(updateProduct);

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const productDelete = async (req, res) => {
    try {
        const _id = req.params.id;
        const productExist = await Product.findOne({_id});
    
        if(!productExist){
            return res.status(400).json({message: "User you're trying to delete does not exist"});
        }
        await Product.findByIdAndDelete(_id)
        return res.status(200).json({message: "Product delete succesfully"});

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};