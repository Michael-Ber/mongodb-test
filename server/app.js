import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/auth.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

//Register
app.use("/api/auth", router);


//Constants
const PORT = process.env.PORT || 3001;


async function start() {
    try {
        await mongoose.connect("mongodb://localhost:27017/usersdb");
        app.listen(PORT, () => {console.log(`Server connected to ${PORT}`)})
        
    } catch (error) {
        console.log(error)
    }
}

start();

