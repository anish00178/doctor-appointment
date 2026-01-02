import doctorModel from "../models/doctorModel.js"; 



//add doctor
export const addDoctor=async(req,res)=>{
    try{
        const {name,about,degree,speciality,experience,fees,email,image,phone,address,dob,gender}=req.body
        if(!name || !about || !degree || !speciality || !experience || !fees ||!email  || !phone || !address || !dob || !gender){
            return res.status(500).send({
                success:false,
                message:'Please provide All fields'
            });
        }
        const photoBase64=req.file && req.file.buffer.toString("base64");
        const doctorData={name,about,degree,speciality,experience,fees,email,image:photoBase64,phone,address,dob,gender}
        const doctor=new doctorModel(doctorData)
        await doctor.save()

        res.status(201).send({
            success:true,
            message:'Doctor Created',
            doctor,

        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in add doctor Api',
            error
        });
    }
}

//GET ALL DOCTORS
export const getAllDoctor=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        res.status(201).send({
            success:true,
            message:'All doctors List',
            totalCount:doctors.length,
            doctors

        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get all doctors Api',
            error
        });
    }
}

//GET DOCTOR DETAILS
export const getDoctorDetails=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
                res.status(400).send({
                success:false,
                message:'Please add doctors',
            });
        }
        //Find doctor
        const doctor=await doctorModel.findById(id)
        if(!doctor){
                res.status(400).send({
                success:false,
                message:'No doctor found the ID',
            });
        }
        res.status(200).send({
                success:true,
                message:'Details fetched Successfully',
                doctor
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get doctor details Api',
            error
        });
    }
}

//UPDATE DOCTOR

export const updateDoctor=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
                res.status(400).send({
                success:false,
                message:'Please update doctor details',
            });
        }
        const data=req.body
        const photoBase64=req.file && req.file.buffer.toString("base64");
        const doctor=await doctorModel.findByIdAndUpdate(id,
            {$set:data},
            {new: true})
        res.status(200).send({
                success:true,
                message:'Doctor Details Updated',
                doctor
        }); 
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update doctor Api',
            error
        });
    }
}

//DELETE DOCTOR
export const deleteDoctor=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
                res.status(400).send({
                success:false,
                message:'Please update doctor details',
            });
        }

        await doctorModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Doctor deteted Suceessfully',
            doctor

        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete doctor Api',
            error
        });
    }
}