import { CartItemsController } from './cart.controller.js';
import { upload } from '../../src/middlewares/fileUpload.middleware.js'
// Manages routes/paths to ProductController.

// 1.Import Express.
import express from 'express';

// Initialize Express Router.
export const cartRouter = express.Router();
const cartItemsController = new CartItemsController();

cartRouter.post('/', cartItemsController.add);
cartRouter.get('/', cartItemsController.get);
cartRouter.delete('/:id',cartItemsController.delete);


export default cartRouter;