import React, { useState, useEffect } from "react";
import Users from "./components/users";
import app from "./api";

const App = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        app.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (id) => {
        const newArrOfUsers = users.filter((user) => user._id !== id);
        setUsers(newArrOfUsers);
    };
    const handleToggleBookmark = (id) => {
        const index = users.findIndex((name) => name._id === id);
        const statusOfBookmark = users[index].bookmark;
        statusOfBookmark === true
            ? (users[index].bookmark = false)
            : (users[index].bookmark = true);

        const newArrOfUsers = [...users];
        setUsers(newArrOfUsers);
    };

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookmark}
                ></Users>
            )}
        </>
    );
};
export default App;
