import React from "react";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";
import PropTypes from "prop-types";
// import { CommentsProvider } from "../../../hooks/useComments";
import { useSelector } from "react-redux";
import {
    getCurrentUserData,
    getCurrentUserId,
    getUserById
} from "../../../store/users";

const UserPage = ({ userId }) => {
    const currentUser = useSelector(getCurrentUserData());
    const currentUserId = useSelector(getCurrentUserId());
    const user = useSelector(getUserById(userId));

    if (user) {
        return (
            <div className="container mt-4">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        {currentUserId === user._id ? (
                            <UserCard user={currentUser} />
                        ) : (
                            <UserCard user={user} />
                        )}
                    </div>
                    <div className="col-md-8">
                        {/* <CommentsProvider> */}
                        <Comments />
                        {/* </CommentsProvider> */}
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserPage;
