import mongoose from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../error-handler/application-error.js";
// import UserModel from "./user.model.js";

// Creating 
const UserModel = mongoose.model('User', userSchema);


export default class UserRepository {
    async signup(user) {
        try {
            // Create instance of model
            const newUser = new UserModel(user);
            await newUser.save();
            return newUser;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                throw error;
            }else{
                console.log(error);
                throw new ApplicationError("Something went wrong with database", 500);
            }
        }
    }

    async signin(email,password){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async resetPassword(userID,hashedPassword){
        try {
            let user = await UserModel.findById(userID);
            user.password = hashedPassword;
            user.save(user);
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }
}

