import { Router } from "express";
import { checkAuth } from "../utils/chechAuth.js";
import { createPost, getAll } from "../controllers/posts.js";

const router = new Router();

//http://localhost:3002/api/posts
//Create Post
router.post("/createPost", checkAuth, createPost)


//Get All Post
router.get("/", getAll)



export default router;