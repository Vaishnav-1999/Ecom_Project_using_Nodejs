import mongoose from "mongoose";
import dotenv from "dotenv";
import { categorySchema } from "../product/category.schema.js";

dotenv.config();
const url = process.env.DB_URL;

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        addCateories();
        console.log("Connected to MongoDb using Mongoose")
    } catch (error) {
        console.log("Error while connecting to DB " + error);
    }
}

async function addCateories(){
    const CategoryModel = mongoose.model('Category',categorySchema);
    const categories = await CategoryModel.find();

    if(!categories || categories.length==0){
        await CategoryModel.insertMany([{name:'Books'},{name:'Clothing'},{name:'Electronics'}])
    }
    console.log("Categories are Added");
}