import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const createComment = async(req, res) => {
    console.log(req.body)
    try {
        const { postId, comment } = req.body;
        console.log(comment);
        if(!comment) return res.json({message: "Empty comment not available"});
        const newComment = new Comment({comment});
        await newComment.save();
        await Post.findByIdAndUpdate(postId, {
            $push: { comments:  newComment._id}
        })
        return res.json(newComment);

    } catch (error) {
        res.json({message: "Error while creating comment"})
    }
}