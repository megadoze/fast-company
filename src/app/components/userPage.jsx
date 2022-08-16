import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";
import Quality from "./qualitie";

const UserPage = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((userId) => setUser(userId));
    }, []);

    // console.log(userId, user);

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
                        <div>
                            {user.qualities.map((quality) => (
                                <Quality key={quality._id} {...quality} />
                            ))}
                        </div>
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
    userId: PropTypes.string,
    name: PropTypes.string,
    completedMeetings: PropTypes.number
};

export default UserPage;
