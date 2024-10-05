// Import Express
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import swagger from 'swagger-ui-express';
import cors from 'cors';

import { productRouter } from "./src/product/product.routes.js";
import bodyParser from "body-parser";
import { userRouter } from "./src/user/user.routes.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/cart/cart.routes.js";
import apiDocs from './swagger.json' assert {type: 'json'};
import loggerMiddleware, { logger } from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/application-error.js";
import { connectToMongoDB } from "./src/config/mongodb.js"
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import { likeRouter } from "./src/like/like.routes.js";
import mongoose from "mongoose";




// Create Server
const server = express();

// Loading all the environment variables in to the application

server.use(bodyParser.json());

// To Avoid CORS Error Import CORS module, And use it.
var corsOptions = {
    origin: 'http://localhost:5500'
}
server.use(cors(corsOptions));

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// Using logger.
server.use(loggerMiddleware);

// All request related to Product redirect to product route.
server.use('/api/products', jwtAuth, productRouter)

server.use('/api/users', userRouter);

server.use('/api/cart', jwtAuth, cartRouter);

server.use('/api/like', jwtAuth , likeRouter)

server.get("/", (req, res) => {
    res.send('Welcome to Ecommerce APIs');
})

// Error Handler Middleware
server.use((err, req, res, next) => {
    // console.log(err);

    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(err.message);
    }


    if (err instanceof ApplicationError) {
        res.status(err.code).send(err.message);
    }
    res.status(500).send("Something has gone wrong, Please try later");
    // const logData = `${JSON.stringify(err)}`;
    logger.info("Something has gone wrong, Please try later");
})

// Handling 404 request
server.use((req, res) => {
    res.status(404).send("API not found");
})


server.listen(3200, () => {
    console.log("Server is running on 3200")
    // connectToMongoDB();
    connectUsingMongoose();
});
