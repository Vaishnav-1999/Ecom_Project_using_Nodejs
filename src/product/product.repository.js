import { ObjectId } from "mongodb";
import { ApplicationError } from "../error-handler/application-error.js";
import { getDb } from "../config/mongodb.js";
import mongoose from "mongoose";

import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./review.schema.js";
import { categorySchema } from "./category.schema.js";

const ProductModel = mongoose.model('Product', productSchema);

const ReviewModel = mongoose.model('Review', reviewSchema);

const CategoryModel = mongoose.model('Category', categorySchema);

export class ProductRepository {

    constructor() {
        this.collection = "products";
    }
    async add(addedProduct) {
        try {
            // const db = getDb();
            // // 2.Get Collection
            // const collection = db.collection(this.collection);
            // await collection.insertOne(newProduct);
            // return newProduct;

            // Add Product
            addedProduct.categories = addedProduct.category.split(',').map(e => e.trim());
            console.log(addedProduct.categories);
            const newProduct = new ProductModel(addedProduct);
            const savedProduct = await newProduct.save();

            // Update Categories
            await CategoryModel.updateMany({
                _id: {$in:newProduct.categories}
            },{$push:
                {products: new ObjectId(savedProduct._id)}
            })
            return savedProduct;
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong Db operation", 503);
        }
    }

    async getAll() {
        try {
            const db = getDb();
            // 2.Get Collection
            const collection = db.collection(this.collection);
            return await collection.find().toArray();
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }

    async get(id) {
        try {
            const db = getDb();
            // 2.Get Collection
            const collection = db.collection(this.collection);
            const record = await collection.findOne({ _id: new ObjectId(id) });
            console.log(record);
            return record;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }

    async filter(minPrice, maxPrice, category) {
        try {
            const db = getDb();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if (minPrice) {
                filterExpression.price = { $gte: parseFloat(minPrice) };
            }
            if (maxPrice) {
                filterExpression.price = { ...filterExpression.price, $lte: parseFloat(maxPrice) };
            }
            if (minPrice) {
                filterExpression.category = category;
            }

            return collection.find(filterExpression).toArray();
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }

    async rateProduct(userId, productId, rating) {
        try {
            // const db = getDb();
            // const collection = db.collection(this.collection);
            // collection.updateOne({
            //     _id:new ObjectId(productId)
            // },{
            //     $push:{ratings:{userId,rating}}
            // });
            // 1.Check If Product Exists.

            const productToUpdate = await ProductModel.findById(productId);

            if (!productToUpdate) {
                throw new Error("Product not found");
            }

            // 2.Getting Existing Review
            const userReview = await ReviewModel.findOne({
                product: new ObjectId(productId), user: new ObjectId(userId)
            })

            // console.log(userReview)

            if (userReview) {
                userReview.rating = rating;
                await userReview.save();
            } else {
                // console.log(rating);
                const newReview = new ReviewModel({
                    product: new ObjectId(productId),
                    user: new ObjectId(userId),
                    rating: rating
                })
                newReview.save();
            }


        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }
}