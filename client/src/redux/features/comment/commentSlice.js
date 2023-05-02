import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    comments: [],
    loading: false
};

const BASE_URL = "http://localhost:3002/api";

export const createComment = createAsyncThunk('comments/createComment', async({postId, comment}) => {
    try {
        const data = {postId, comment};
        const resp = await fetch(`${BASE_URL}/comments/${postId}`, {
            method: 'POST',
            headers: {
                "authorization": "Bearer " + window.localStorage.getItem("token"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const respJSON = await resp.json();
        return respJSON; 
    } catch (error) {
        console.log(error);
    }
})

export const getPostComments = createAsyncThunk('comments/getPostComments', async(postId) => {
    try {
        const resp = await fetch(`${BASE_URL}/posts/comments/${postId}`);
        return resp.json();
    } catch (error) {
        console.log(error)
    }
})


const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        //Create Comment
        [createComment.pending]: state => {state.loading = true},
        [createComment.fulfilled]: (state, action) => {state.loading = false; state.comments.push(action.payload)},
        [createComment.rejected]: state => {state.loading = false},
        //Getting Post Comments
        [getPostComments.pending]: state => {state.loading = true},
        [getPostComments.fulfilled]: (state, action) => {state.loading = false; state.comments = action.payload},
        [getPostComments.rejected]: state => {state.loading = false},
    }
});

export default commentsSlice.reducer;