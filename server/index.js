import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import postsRoute from "./routes/posts.js";
dotenv.config();


const app = express();

app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(cors());
app.use("/posts",postsRoute);
mongoose.connect(process.env.CONNECTION_URL);
const PORT = process.env.PORT || 5000;

app.listen(PORT,function(){
    console.log(`Server is running on ${PORT}`);
})