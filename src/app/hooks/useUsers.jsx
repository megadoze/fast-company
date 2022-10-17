import React, { useContext, useState, useEffect } from "react";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    // функция получения юзеров
    async function getUsers() {
        try {
            const { content } = await userService.get();
            setUsers(content);
            console.log("Content", content);
            setIsLoading(false);
        } catch (error) {
            // setError(error.message);
            errorCatcher(error);
        }
    }
    useEffect(() => {
        getUsers();
    }, []);

    function errorCatcher(error) {
        console.log(error.response.data);
        const { message } = error.response.data;
        setError(message);
    }
    function getUserById(userId) {
        return users.find((u) => u._id === userId);
    }
    return (
        <UserContext.Provider value={{ users, getUserById }}>
            {!isLoading ? children : "Loading..."}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
