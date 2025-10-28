import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken';

export const userRegister =async (req,res)=>{
    try{
        const {name,email,password}=req.body
        //validation
        if(!name || !email || !password){
            return res.status(400).send({
                success:false,
                message:'Please provide All fields'
            });
        }
        
        //hasing
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)


        const userData={name,email,password:hashedPassword}
        //save UserData
        const newUser=new userModel(userData)
        const user=await newUser.save()

        res.status(201).send({
            success:true,
            message:'Register Successfully',
            user,

        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Somethings went wrong',
            error
        });
    }
};

//LOGIN
export const userLogin= async(req,res)=>{
    try{
        const {email,password}=req.body
        //validation
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'Please add email and password'
            });
        
        }
        //find user
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found'
            });
        }
        //match password
        const isMatch=await bcrypt.compare(password,user?.password)
        if(!isMatch){
            return res.status(402).send({
                success:false,
                message:'Invalid Credentail'
            });
        }

        //token
        const token=JWT.sign({id:user?._id}, process.env.JWT_SECRET,{
            expiresIn:"7d",
        });
         

        user.password=undefined;
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user,
        });


    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Somethings went wrong',
            error
        });
    }
}

//update user details
export const updateUser =async (req,res)=>{
    try{
        const{id}=req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'User id not found'
            });
        }
        const{name,phone,dob,image,gender,address}=req.body
        const photoToBase64=req.file && req.file.buffer.toString('base64')
        const user=await userModel.findByIdAndUpdate(id,{
            $set:{name,dob,address,phone,gender,image:photoToBase64}
        },{returnOriginal:true}
    );
    res.status(202).send({
        success:true,
        message:"Profile updated Successfully",
        user,
    });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Somethings went wrong in update user api',
            error
        });
    }
}

//Password reset

export const updatePassword =async (req,res)=>{
    try{
        //user id
        const {id}=req.params
        if(!id){
            return res.status(404).send({
                success:false,
                message:'User id not found'
            });
        }
        //req body
        const {oldPassword,newPassword}=req.body
        if(!oldPassword || !newPassword){
            return res.status(500).send({
                success:false,
                message:'Please provide old and new Password'
            });
        }
        //find user
        const user=await userModel.findById(id)
        if(!user){
            return res.status(402).send({
                success:false,
                message:'User not found'
            });
        }
        //Check old Password
        const isMatch=await bcrypt.compare(oldPassword, user?.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:'Incorrect old password'
            });
        }
        //hasing
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(newPassword,salt)

        //update
        user.password=hashedPassword
        await user.save();
        
        return res.status(200).send({
                success:true,
                message:'Password updated Successfully'
        });
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update password api',
            error
        });
    }
}