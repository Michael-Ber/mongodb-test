import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth/authSlice";
import post from "./features/post/postSlice";
import comment from "./features/comment/commentSlice";

export const store = configureStore({
    reducer: {auth, post, comment}
});