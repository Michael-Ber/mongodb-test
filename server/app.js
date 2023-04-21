import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileupload from 'express-fileupload';

import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";

const app = express();
dotenv.config();

//Middlewares
app.use(cors());
app.use(fileupload());
app.use(express.json());
app.use(express.static('uploads')); //for static files like images

//Routes
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);


//Constants
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.xtvkyqs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
        app.listen(PORT, () => {console.log(`Server connected to ${PORT}`)})
        
    } catch (error) {
        console.log(error)
    }
}

start();

