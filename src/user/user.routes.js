import { UserController } from './user.controller.js';
import { upload } from '../../src/middlewares/fileUpload.middleware.js'
// Manages routes/paths to ProductController.

// 1.Import Express.
import express from 'express';
import jwtAuth from '../middlewares/jwt.middleware.js';

// Initialize Express Router.
export const userRouter = express.Router();
const userController = new UserController();


userRouter.post('/signup', (req, res, next) => {
    userController.signUp(req, res, next);
});
userRouter.post('/signin', (req, res) => {
    userController.signIn(req, res);
});
userRouter.put('/resetpassword', jwtAuth, (req, res) => {
    userController.resetPassword(req, res);
})


