import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: { type: String, maxLength: [25, "Name cannot be greater than 25 characters"] },
    email: { type: String, unique: true, required: true, match: [/.+@.+\..+/, "Please Enter a Valid Email"] },
    password: String,
    type: { type: String, enum: ['Customer', 'Seller'] }
})