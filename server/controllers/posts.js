import Post from "../models/Post.js";
import User from "../models/User.js";
import path, {dirname} from "path";
import { fileURLToPath } from "url";

export const createPost = async(req, res) => {
    
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);
        if(req.files) {
            let filename = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', filename));
            const newPostWithImage  = new Post({username: user.name, title, text, imgUrl: filename, author: req.userId});
            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage }
            })
            return res.json(newPostWithImage);
        }
        const newPostWithoutImage = new Post({username: user.name, title, text, imgUrl: '', author: req.userId});
        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage }
        })
        return res.json(newPostWithoutImage);

    } catch (error) {
        res.json({message: "Error while adding post", "error": error})
    }
}

export const getAll = async(req, res) => {
    try {
        const posts = await Post.find({}).sort('-createdAt');
        const popularPosts = await Post.find({}).limit(5).sort('-views');
        if(!posts) return res.json({message: "There is no posts"});
        return res.json({posts, popularPosts});
    } catch (error) {
        res.json({message: "Bad request on getting posts"})
    }
}

export const getById = async(req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        });
        return res.json(post);

    } catch (error) {
        res.json({message: "Bad request on getting post by id"})
    }
}


export const getMyPosts = async(req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.posts?.map(item => Post.findById(item._id))
        )
        return res.json(list);
    } catch (error) {
        res.json({message: "Bad request on getting my posts"})
    }
}

export const deletePost = async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post) return res.json({message: 'No such a post'})
        await User.findByIdAndUpdate(req.userId, {
            $pull: {posts: req.params.id}
        });
        return res.json({post, message: "Post was deleted"})
    } catch (error) {
        res.json({message: "Bad request on deleteing post"})
    }
}