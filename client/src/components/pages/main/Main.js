import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../../redux/features/post/postSlice';
import { PostItem } from '../../postItem/postItem';
import { PopularPost } from '../../popularPost/popularPost';
import './main.scss';

const Main = () => {
    const {posts, popularPosts} = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch])


    const postsUI = posts && posts.length !== 0 ? posts.map(item => {
        return <PostItem key={item._id} item={item}/>
    }) : <div style={{'color': '#fff'}}>There is no posts</div>


    const popularPostsUI = popularPosts && popularPosts.length !== 0 ? popularPosts.map(item => {
        return <PopularPost key={item._id} item={item}/>
    }): <div>There is no posts</div>

    return (
        <div className="main">
            <ul className="main__posts posts-main">
                POSTS:
                {postsUI}
            </ul>
            <ul className="main__popular-posts popular-posts-main">
                POPULAR POSTS:
                {popularPostsUI}
            </ul>
        </div>
    )
}

export default Main;