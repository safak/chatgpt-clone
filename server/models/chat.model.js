import mongoose, {Schema} from "mongoose";

const chatSchema = new Schema({
    userId:{
        type: String,
        required: true
    },
    history:[
        {
        role: {
            type: String,
            enum: ["user", "model"],
            required: true
        } ,
        parts:[
            {
                text: {
                    type: String,
                    required: true
                }
            }
        ],
        image:{
            type: String,
            required: false
        }
        }
    ]
}, {timestamps: true})


export const Chat = mongoose.model("Chat", chatSchema);