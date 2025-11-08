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