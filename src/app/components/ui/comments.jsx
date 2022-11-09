import { orderBy } from "lodash";
import React, { useEffect } from "react";
import UserCommentsList, { AddCommentForm } from "../common/comments/index";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    removeComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../../store/comments";
import { useParams } from "react-router-dom";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    // console.log(currentUserId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const isLoading = useSelector(getCommentsLoadingStatus());

    const comments = useSelector(getComments());
    // console.log("comments:", comments);

    const handleSubmit = (data) => {
        dispatch(createComment(data, userId, currentUserId));
    };

    const handleDelete = (commentId) => {
        dispatch(removeComment(commentId));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <AddCommentForm onSubmit={handleSubmit} />
            {sortedComments.length > 0 &&
                (!isLoading ? (
                    <UserCommentsList
                        comments={sortedComments}
                        onRemove={handleDelete}
                    />
                ) : (
                    "Loading..."
                ))}
        </>
    );
};

export default Comments;
