import React, { useState, useEffect, useCallback } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { deletePost } from '../../../redux/features/post/postSlice';
import { createComment } from '../../../redux/features/comment/commentSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Moment from 'react-moment';
import { CommentItem } from '../../commentItem/CommentItem';

import './postPage.scss';

export const PostPage = () => {
    const [post, setPost] = useState('');
    const [comment, setComment] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation().pathname;
    const { user } = useSelector(state => state.auth);
    const {comments} = useSelector(state => state.comment)

    const fetchPost = useCallback(async() => {
        const resp = await fetch(`http://localhost:3002/api/posts/${params.id}`);
        const respJSON = await resp.json();
        setPost(respJSON);
    }, [params.id])

    const fetchComment = (e) => {
        e.preventDefault();
        dispatch(createComment({postId: params.id, comment}))
    }

    useEffect(() => {
        fetchPost();
    }, [fetchPost])

    const deleteHandler = () => {
        dispatch(deletePost(params.id));
        navigate("/");
    }

  return (
    <div className="post">
        <div className="post__left">
            <div className="post__btns">
                <button onClick={() => navigate("/")} className='post__btn post__back'>Back</button>
                {user && user._id === post.author && (
                    <>
                        <button onClick={deleteHandler} className='post__btn post__delete'>Delete</button>
                        <Link to={`${location}/edit`} className='post__btn post__edit'>Edit</Link>
                    </>
                )}
                

            </div>
            <div className={post.imgUrl !== '' ? "post__img" : "post__no-img"}>
            {post.imgUrl && <img src={`http://localhost:3002/${post.imgUrl}`} alt={`${post.title}`} />}
            </div>
            <div className="item-posts__upper">
            <p className="item-posts__author">{post.username}</p>
            <span className="item-posts__date"><Moment date={post.createdAt} format="D MMM YYYY"/></span>
            </div>
            <h4 className="item-posts__title">{post.title}</h4>
            <p className="item-posts__text">{post.text}</p>
            <div className="item-posts__footer">
                
                <span className="item-posts__views recall">
                <AiFillEye className='icon'/> 
                {post.views}
                </span>
                <span className="item-posts__comments recall"> 
                <AiOutlineMessage className='icon'/>
                {post.comments?.length}
                </span>
            </div>
        </div>
        <div className="post__right">
            <div className="post__comments comments-post">
                <form onSubmit={(e) => fetchComment(e)}  className = "comments-post__form">
                    <input 
                        value = {comment}
                        onChange = {(e) => setComment(e.target.value)}
                        className='comments-post__input'
                        placeholder='Comment'
                        name="comment"
                        type="text" />
                    <button type="submit" className="comments-post__add">ADD</button>
                </form>

                <ul className="comments-post__list">
                    {
                        comments && comments.map(cmt => {
                            console.log(cmt);
                            return <CommentItem key={cmt._id} cmt={cmt} />
                        })
                    }
                </ul>

                
            </div>
        </div>
    </div>
  )
}
