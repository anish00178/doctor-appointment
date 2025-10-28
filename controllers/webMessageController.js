import webmessageModel from "../models/webMessage.js";

//create
export const createMessage =async (req,res)=>{
    try{
        const {name,contact,message}=req.body
        if(!name || !contact || !message){
            return res.status(400).send({
                success:false,
                message:'Please provide All fields'
            });
        }
        const webMessage=new webmessageModel({name,contact,message});
        webMessage.save();
        res.status(201).send({
            success:true,
            message:"Your Message Sent Successfully",
            webMessage,
        })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in web message Api',
            error
        });
    }
}

//getAll message
export const getAllMessages =async (req,res)=>{
    try{
        const webMessages=await webmessageModel.find({}) 
        res.status(201).send({
            success:true,
            message:"All Web Messages",
            totalCount:webMessages.length,
            webMessages,
        })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get all web message Api',
            error
        });
    }
}

//Delete message
export const deleteWebMessages =async (req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            res.status(404).send({
            success:false,
            message:'Please provide message id',
        });
        }
        
        //find message
        const webMessage=await webmessageModel.findByIdAndDelete(id)
        res.status(201).send({
            success:true,
            message:"Message has been deleted",
        })


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete web message Api',
            error
        });
    }
}