import { orderBy } from "lodash";
import React, { useState, useEffect } from "react";
import api from "../../api";
import { useParams } from "react-router-dom";
import UserCommentsList, { AddCommentForm } from "../common/comments/index";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);

    const handleSubmit = (data) => {
        api.comments
            .add({ ...data, pageId: userId })
            .then((data) => setComments([...comments, data]));
    };

    const handleDelete = (id) => {
        api.comments.remove(id).then((data) => setComments(data));
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    };

    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

    return (
        <>
            <AddCommentForm onSubmit={handleSubmit} />
            {sortedComments.length > 0 && (
                <UserCommentsList
                    comments={sortedComments}
                    onRemove={handleDelete}
                />
            )}
        </>
    );
};

export default Comments;
