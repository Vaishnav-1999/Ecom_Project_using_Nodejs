import mongoose from "mongoose";

export const cartSchema = new Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    quantity:Number
})