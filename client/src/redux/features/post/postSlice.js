import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false
};
const BASE_URL = "http://localhost:3002/api";

//http://localhost:3002/api/posts

export const createPost = createAsyncThunk(
    "post/createPost", async(data) => {
        try {
            const resp = await fetch(`${BASE_URL}/posts/createPost`, {
                method: "POST",
                headers: {
                    "authorization": "Bearer " + window.localStorage.getItem("token")
                },
                body: data
            });
            const respJSON = await resp.json();
            return respJSON;
        } catch (error) {   
            console.log(error)
        }
        

    }
);

export const getPosts = createAsyncThunk(
    "post/getPosts", 
    async() => {
        try {
            const resp = await fetch(`${BASE_URL}/posts`);
            return await resp.json()
        } catch (error) {
            console.log(error)
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async(id) => {
        try {
            const resp = await fetch(`http://localhost:3002/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "authorization": "Bearer " + window.localStorage.getItem('token')
                }
            });
            const respJSON = await resp.json();
            console.log(respJSON);
            return respJSON
        } catch (error) {
            console.log(error)
        }
    
    }   
)

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        //CreatePost
        [createPost.pending]: state => {state.loading = true},
        [createPost.fulfilled]: (state, action) => {state.loading = false; state.posts.push(action.payload)},
        [createPost.rejected]: (state, action) => {state.loading = false},

        //GetAllPosts
        [getPosts.pending]: state => {state.loading = true},
        [getPosts.fulfilled]: (state, action) => {state.loading = false; state.posts = action.payload.posts; state.popularPosts = action.payload.popularPosts},
        [getPosts.rejected]: (state, action) => {state.loading = false},

        //DeletePost
        [deletePost.pending]: state => {state.loading = true},
        [deletePost.fulfilled]: (state, action) => {state.loading = false; state.posts = state.posts.filter(item => item._id !== action.payload.post._id); state.popularPosts = action.payload.popularPosts},
        [deletePost.rejected]: (state, action) => {state.loading = false},
    }
});

export default postSlice.reducer;