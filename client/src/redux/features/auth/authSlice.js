import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null
};

const BASE_URL = "http://localhost:3002/api/auth";

export const registerUser = createAsyncThunk('auth/registerUser', async({name, password}) => {
    try {
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": "Bearer " + window.localStorage.setItem("token")
            },
            body: JSON.stringify({name, password})
        });
        const resJSON = await res.json();
        if(resJSON.token) {
            window.localStorage.setItem('token', resJSON.token);
        }
        return resJSON;
    } catch (error) {
        console.log(error)
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async({name, password}) => {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, password})
        });
        const resJSON = await res.json();

        if(resJSON.token) {
            window.localStorage.setItem('token', resJSON.token);
        }
        return resJSON;
    } catch (error) {
        console.log(error)
    }
});

export const getMe = createAsyncThunk('auth/getMe', async() => {
    try {
        const res = await fetch(`${BASE_URL}/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + window.localStorage.getItem("token")
            }
        });
        const resJSON = await res.json();
        return resJSON;
    } catch (error) {
        console.log(error)
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            state.user = null; 
            state.token = null; 
            state.isLoading = false; 
            state.status = null; 
        }
    },
    extraReducers: {
        //Register
        [registerUser.pending]: (state) => {state.isLoading = true; state.status = null},
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.newUser;
            state.token = action.payload.token;
        },
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        }, 
        //Login
        [loginUser.pending]: (state) => {state.isLoading = true; state.status = null},
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message;
            state.isLoading = false;
        }, 
        //getMe
        [getMe.pending]: (state) => {state.isLoading = true; state.status = null},
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        [getMe.rejected]: (state, action) => {
            state.status = action.payload?.message;
            state.isLoading = false;
        },
    }
});

export const checkIsAuth = state => Boolean(state.auth.token);
export const { logout } = authSlice.actions;

export default authSlice.reducer;