import mongoose from "mongoose"
export const connectMongodb=async(req,res)=>{
    try{
        const con = await mongoose.connect(process.env.mongo_api)
        console.log("Mongodb connected")
    }
    catch(error){
        console.log(error)
    }
}