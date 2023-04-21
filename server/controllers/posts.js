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