import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleReturn = () => {
        history.push("/users");
    };
    return (
        <>
            {user ? (
                <>
                    <div>
                        <h2>{user.name}</h2>
                        <h3>Профессия: {user.profession.name}</h3>
                        <QualitiesList qualities={user.qualities} />
                        <h5>CompletedMeetings: {user.completedMeetings}</h5>
                        <h3>Rate: {user.rate}</h3>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                            handleReturn();
                        }}
                    >
                        К списку пользователей
                    </button>
                </>
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
