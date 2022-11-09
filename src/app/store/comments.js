import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";
import { nanoid } from "nanoid";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload;
            // console.log("action.payload", state.entities);
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        commentDeleted: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
            state.isLoading = false;
            // console.log("action.payload", action.payload);
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commentCreated,
    commentDeleted
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceved(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const createComment =
    (data, userId, currentUserId) => async (dispatch) => {
        dispatch(commentsRequested());
        const comment = {
            ...data,
            _id: nanoid(),
            pageId: userId,
            created_at: Date.now(),
            userId: currentUserId
        };
        try {
            const { content } = await commentService.createComment(comment);
            dispatch(commentCreated(content));
        } catch (error) {
            dispatch(commentsRequestFiled(error.message));
        }
    };

export const removeComment = (commentId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentDeleted(commentId));
        }
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
