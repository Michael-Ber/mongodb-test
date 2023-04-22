import React, { useState, useEffect, useCallback } from 'react';
import { PostItem } from '../../postItem/postItem';

import './postsPage.scss';

export const PostsPage = () => {
    const [myPosts, setMyPosts] = useState([]);

    const fetchMyPosts = useCallback(async() => {
        const resp = await fetch("http://localhost:3002/api/posts/user/me", {
            headers: {
                "authorization": "Bearer " + window.localStorage.getItem('token')
            }
        });
        const respJSON = await resp.json();
        setMyPosts(respJSON);
    }, [])

    useEffect(() => {
        fetchMyPosts();
    }, [fetchMyPosts])

    const postsUI = myPosts.map(post => {
        return <PostItem key={post._id} item={post} />
    })

  return (
    <ul className="my-posts">
        {postsUI}
    </ul>
  )
}
