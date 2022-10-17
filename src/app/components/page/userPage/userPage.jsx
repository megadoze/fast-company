import React from "react";
// import api from "../../../api";
import UserCard from "../../ui/userCard";
import Comments from "../../ui/comments";
import PropTypes from "prop-types";
import { useUser } from "../../../hooks/useUsers";
import { CommentsProvider } from "../../../hooks/useComments";
import { useAuth } from "../../../hooks/useAuth";

const UserPage = ({ userId }) => {
    const { currentUser } = useAuth();
    const { getUserById } = useUser();
    const user = getUserById(userId);

    // if (currentUser._id === user._id) {
    //     console.log(currentUser.name);
    // }

    if (user) {
        return (
            <div className="container mt-4">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        {currentUser._id === user._id ? (
                            <UserCard user={currentUser} />
                        ) : (
                            <UserCard user={user} />
                        )}
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
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
