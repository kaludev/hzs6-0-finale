import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery',true);

    if (isConnected) {
        console.log('MongoDD already connected');
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"hzs6-0",
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
            isConnected = true;
          });
      
          mongoose.connection.on('error', (err) => {
            console.error(`Mongoose connection error: ${err}`);
          });
      
          mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
            isConnected = false;
          });
        isConnected = true;
        console.log("Mongodb is connected");
    }catch(e){
        console.log(e.message);
    }
}