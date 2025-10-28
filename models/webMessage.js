import Mongoose from "mongoose";

const webMessageSchema =new Mongoose.Schema({
    name:{type:String,required:[true,"name is required"]},
    contact:{type:String,required:[true,"contact no or email is required"]},
    message:{type:String,required:[true,"message is required"]},
},{timestamps:true});

const webmessageModel =Mongoose.model('webmessage',webMessageSchema)

export default webmessageModel