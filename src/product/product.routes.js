import ProductController from './product.controller.js';
import { upload } from '../../src/middlewares/fileUpload.middleware.js'
// Manages routes/paths to ProductController.

// 1.Import Express.
import express from 'express';

// Initialize Express Router.
export const productRouter = express.Router();
const productController = new ProductController();
// console.log("I'm here")
productRouter.post("/rate", (req,res,next)=>{
    productController.rateProduct(req,res,next);
});
productRouter.get('/filter', (req,res)=>{
    productController.filterProducts(req,res);
});
productRouter.get('/',  (req,res)=>{
    productController.getAllProducts(req,res);
});
productRouter.post('/', upload.single('imageUrl'),  (req,res)=>{
    productController.addProduct(req,res);
});
productRouter.get('/:id',  (req,res)=>{
    productController.getOneProduct(req,res);
});




