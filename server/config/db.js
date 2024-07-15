import mongoose from "mongoose";

const dbConnect = ()=>{
    try{
        mongoose.connect('mongodb://localhost:27017/dishes');
        console.log("Connected to DB");
    }catch(error){
        console.log(error.message);
    }
}

export default dbConnect;