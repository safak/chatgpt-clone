import mongoose, {Schema} from "mongoose";

const userChatsSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    chats:[
        {
        _id: {
            type: String,
            required: true
        } ,
        title: {
            type: String,
            required: true
        } ,
        createdAt: {
            type: Date,
            default: Date.now(),
        } ,
        
        }
    ]
}, {timestamps: true})


export const UserChats = mongoose.model("UserChats", userChatsSchema);