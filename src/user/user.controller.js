import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';
import UserRepository from "./user.repository.js"
import { ApplicationError } from "../error-handler/application-error.js";
import bcrypt, { genSalt } from "bcrypt";
import mongoose from "mongoose";

export class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async resetPassword(req, res) {
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const userId = req.userId;
        try {
            await this.userRepository.resetPassword(userId, hashedPassword);
            res.status(200).send("Password is Updated");
        } catch (error) {
            throw new ApplicationError("Something went wrong", 503);
        }
    }

    async signUp(req, res, next) {
        try {
            const { name, email, password, type } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            const newUser = new UserModel(name, email, hashedPassword, type);
            await this.userRepository.signup(newUser);
            res.status(201).send(newUser);
        } catch (error) {
            // console.log(error);
            // res.status(200).send('Something went wrong');
            next(error);

        }
    }

    async signIn(req, res, next) {
        try {
            // 1.Find User by Email.
            const user = await this.userRepository.signin(req.body.email, req.body.password);

            if (!user) {
                return res.status(400).send("Incorrect Email");
            } else {
                // 2.Compare password with hashed Password.
                console.log(req.body.password);
                console.log(user.password);
                const result = await bcrypt.compare(req.body.password, user.password);
                console.log(result);
                // 3.If Credentials are correct
                if (result) {
                    // 1.Create Token
                    const token = jwt.sign({ userID: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' })
                    // 2.Send Token
                    return res.send(token);
                } else {
                    res.status(400).send('Incorrect Password');
                }
            }
        } catch (error) {
            console.log(error);
            res.status(200).send('Something went wrong');
        }
    }
}