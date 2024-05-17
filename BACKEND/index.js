import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from 'mongoose'

const app=express();
app.use(cors());
app.use(express.json());
import bookRoute from "./route/book.route.js"
import userRoute from "./route/user.route.js"
const PORT=process.env.PORT || 4000;
const URI=process.env.MongoDBURI;

//connect mongo
try{
  mongoose.connect(URI, {
    useNewUrlParser : true ,
    useUnifiedTopology:true
  });
  console.log("MongoDB connected successfully")
}catch(error){
  console.log("MongoDB connection error:", error);

}

app.use("/book",bookRoute)
app.use("/user",userRoute)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})