import mongoose from "mongoose"

const pasteSchema= new mongoose.Schema({
    pasteId:{
        type:String,
        required:true,
        unique:true
    },
    type:{
        type:String,
        enum:["text","pdf","image","audio","video"],
        default:"text"
    },
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    expiresAt:{
        type:Date,
        required:true
    },
    isProtected:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    }
})
export default mongoose.model("Paste",pasteSchema)