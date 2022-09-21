import React from "react";
import UserComment from "./userComment";
import PropTypes from "prop-types";

const UserCommentsList = ({ comments, onRemove }) => {
    return (
        <div className="card mb-3">
            <div className="card-body ">
                <h2>Comments</h2>
                <hr />
                {comments.map((comment) => {
                    return (
                        <UserComment
                            key={comment._id}
                            {...comment}
                            onRemove={onRemove}
                        />
                    );
                })}
            </div>
        </div>
    );
};

UserCommentsList.propTypes = {
    comments: PropTypes.array,
    onRemove: PropTypes.func
};

export default UserCommentsList;
