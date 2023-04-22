import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMe } from "../../redux/features/auth/authSlice";
import Main from "../pages/main/Main";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import {PostPage} from "../pages/postPage/PostPage";
import {AddPost} from "../pages/addPost/AddPost";
import {EditPost} from "../pages/editPost/EditPost";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import { Layout } from "../layout/Layout";
import { PostsPage } from "../pages/postsPage/PostsPage";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])
    
    return (
        <div className="app">
            <div className="app-container">
                <Layout>
                    <Routes>
                        <Route path="/registration" element={<Register />}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/myPosts" element={<PostsPage />}/>
                        <Route path="/myPosts/:id" element={<PostPage />}/>
                        <Route path="/myPosts/:id/edit" element={<EditPost />}/>
                        <Route path="/newPost" element={<AddPost />}/>
                        <Route path="/" element={<Main />}/>
                    </Routes>

                    <ToastContainer position="bottom-right"/>
                </Layout>
                
            </div>
        </div>
        
    )
}

export default App;
