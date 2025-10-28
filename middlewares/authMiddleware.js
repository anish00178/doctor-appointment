import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';
//user auth

export const userAuth =async (req,res,next)=>{
    try{
        const token=req.headers.authorization;
        if(!token){
            
            return res.status(402).send({
                success:false,
                message:'Not Authorizes User',
            });
        }
        const decode=JWT.verify(token, process.env.JWT_SECRET);
        req.user=decode;
        next();

    }catch(error){
        console.log(error)
        res.status(402).send({
            success:false,
            message:'Error in user Auth',
            error
        });
    }
}

//Admin auth

export const isAdmin =async (req,res,next)=>{
    try{
        const user=await userModel.findById(req.user.id);
        if(user.isAdmin===!true){
            return res.status(402).send({
                success:false,
                message:'Unauthorized Access',
            });
        }else{
            next();
        }
    }catch(error){
        console.log(error)
        res.status(402).send({
            success:false,
            message:'Error in admin Auth',
            error
        });
    }
}