import { orderBy } from "lodash";
import React from "react";
// import api from "../../api";
import UserCommentsList, { AddCommentForm } from "../common/comments/index";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
    const { createComment, comments, removeComment } = useComments();

    const handleSubmit = (data) => {
        createComment(data);
        // api.comments
        //     .add({ ...data, pageId: userId })
        //     .then((data) => setComments([...comments, data]));
    };

    const handleDelete = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments(comments.filter((x) => x._id !== id));
        // });
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
