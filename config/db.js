import mongoose, { connect } from "mongoose";
import 'colors'

const connectDB= async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('Mongoodb Database Connected'.bgMagenta.white)
    });
    await mongoose.connect(`${process.env.MONGO_LOCAL_URI}/doctorapp`)
};

export default connectDB