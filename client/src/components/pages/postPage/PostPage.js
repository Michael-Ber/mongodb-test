import React, { useState, useEffect, useCallback } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { deletePost } from '../../../redux/features/post/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Moment from 'react-moment';

import './postPage.scss';

export const PostPage = () => {
    const [post, setPost] = useState('');
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const fetchPost = useCallback(async() => {
        const resp = await fetch(`http://localhost:3002/api/posts/${params.id}`);
        const respJSON = await resp.json();
        setPost(respJSON);
    }, [params.id])
    
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
                {user._id === post.author && (
                    <>
                        <button onClick={deleteHandler} className='post__btn post__delete'>Delete</button>
                        <button onClick={() => {}} className='post__btn post__edit'>Edit</button>
                    </>
                )}
                

            </div>
            <div className={post.imgUrl ? "post__img" : "post__no-img"}>
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
            <div className="post__comments">COMMENTS</div>
        </div>
    </div>
  )
}
