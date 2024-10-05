import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'types'
    },
    types: {
        type: String,
        enum: ['Product', 'Category']
    }
}).pre('save',()=>{
    console.log("A Like is Coming in...")
}).post('save',()=>{
    console.log("Like has been saved")
})