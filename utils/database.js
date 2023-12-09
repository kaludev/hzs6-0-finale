import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);

    if (isConnected) {
        console.log('MongoDD already connected');
        return;
    }

    try{
        console.log(`${process.env.MONGODB_PASSWORD}`);
        await mongoose.connect(`mongodb+srv://dimitrijeradojkovic8:${process.env.MONGODB_PASSWORD}@cluster0.fdyhf85.mongodb.net/?retryWrites=true&w=majority`,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        isConnected = true;
        console.log("Mongodb is connected");
    }catch(e){
        console.log("error")
    }
}