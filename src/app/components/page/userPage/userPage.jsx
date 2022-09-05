import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleReturn = () => {
        history.push("/users");
    };
    const handleEdit = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <>
            {user ? (
                <div className="container mt-5 mb-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <div>
                                <h1>{user.name}</h1>
                                <h5>Профессия: {user.profession.name}</h5>
                                <Qualities qualities={user.qualities} />
                                <h5>
                                    Completed Meetings: {user.completedMeetings}
                                </h5>
                                <h5>Rate: {user.rate}</h5>
                            </div>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    handleReturn();
                                }}
                            >
                                К списку пользователей
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary ms-2"
                                onClick={() => {
                                    handleEdit();
                                }}
                            >
                                Изменить
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <h4>loading...</h4>
            )}
        </>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
