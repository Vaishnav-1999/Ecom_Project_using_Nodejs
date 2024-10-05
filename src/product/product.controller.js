import ProductModel from "./product.model.js";
import { ProductRepository } from "./product.repository.js"

export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }
    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
        } catch (error) {
            console.log(err);
            return res.status(200).send("Something Went Wrong");
        }
    }

    async addProduct(req, res) {
        try {
            const { name, price, desc, categories } = req.body;
            const addedProduct = new ProductModel(name, parseFloat(price), null, null, categories, desc);
            // sizes.split(','), req.file.filename
            // console.log(newProduct);
            const createdRecord = await this.productRepository.add(addedProduct);
            console.log(createdRecord);
            res.status(201).send(createdRecord);
        } catch (error) {
            console.log(error);
            return res.status(200).send("Something Went Wrong");
        }
    }

    async rateProduct(req, res, next) {
        try {
            const userId = req.userId;
            const productId = req.query.productId;
            const rating = req.query.rating;
            console.log(productId);
            console.log(userId);
            console.log(rating);
            const error = await this.productRepository.rateProduct(userId, productId, rating);
            return res.status(200).send("Rating has been added");
        } catch (error) {
            // return res.status(400).send(error.message);
            console.log("Hiiiiii");
            next(error);
        }

    }

    async getOneProduct(req, res) {
        try {
            const id = req.params.id;
            console.log(id);
            const product = await this.productRepository.get(id);
            if (!product) {
                res.status(404).send("Product Not Found");
            } else {
                return res.status(200).send(product);
            }
        } catch (error) {
            console.log(error);
            return res.status(200).send("Something Went Wrong");
        }
    }

    async filterProducts(req, res) {
        try {
            const minPrice = req.query.minPrice;
            const maxPrice = req.query.maxPrice;
            const category = req.query.category;
            console.log(minPrice + "," + maxPrice + "," + category)
            const result = await this.productRepository.filter(minPrice, maxPrice, category);
            res.status(200).send(result);
        } catch (error) {
            console.log(error);
            return res.status(200).send("Something Went Wrong While Filtering Poducts");
        }
    }
}