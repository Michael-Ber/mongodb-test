import { Router } from "express";
import { checkAuth } from "../utils/chechAuth.js";
import { createPost, getAll, getById, getMyPosts, deletePost } from "../controllers/posts.js";

const router = new Router();

//http://localhost:3002/api/posts
//Create Post
router.post("/createPost", checkAuth, createPost)


//Get All Post
router.get("/", getAll)


//Get POST By Id
//http://localhost:3002/api/posts/id
router.get("/:id", getById)


//Get My POSTS
//http://localhost:3002/api/posts/user/me
router.get("/user/me", checkAuth, getMyPosts)


//Delete Post By Id
//http://localhost:3002/api/posts/user/me
router.delete("/:id", checkAuth, deletePost)



export default router;