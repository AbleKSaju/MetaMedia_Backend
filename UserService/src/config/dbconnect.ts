import mongoose from "mongoose";

export const dbconnect=async ()=>{
    try {
      
        await mongoose.connect(process.env.MONGOURL!)
       console.log('db connected ..!');
       
        
    } catch (error) {
        console.log('error in config/dbconnect in the dbconnect funtion',error);
        
    }
}