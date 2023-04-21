import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../redux/features/post/postSlice';
import { PostItem } from '../../postItem/postItem';
import './main.scss';

const Main = () => {
    const {posts} = useSelector(state => state.post)
    const {popularPosts} = useSelector(state => state.post)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPosts());
    }, [])

    const postsUI = posts.map(item => {
        return <li key={item._id} className="posts-main__item item-posts">
            <div className="item-posts__img">
                <img src='' alt={`${item.title}`} />
            </div>
            <h2 className="item-posts__title">{item.title}</h2>
            <p className="item-posts__text">{item.text}</p>
            <div className="item-posts__footer">
                <span className="item-posts__author">{item.username}</span>
                <span className="item-posts__views">{item.views}</span>
                <span className="item-posts__comments">{item.comments}</span>
            </div>
        </li>
    })
    return (
        <div className="main">
            <ul className="main__posts posts-main">
                {postsUI}
            </ul>
            <div className="main__popular-posts popular-posts-main">POPULAR</div>
        </div>
    )
}

export default Main;