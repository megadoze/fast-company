import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    const newArrOfUsers = users.filter((user) => user._id !== id);
    setUsers(newArrOfUsers);
  };
  const handleToggleBookmark = (id) => {
    const index = users.findIndex((name) => name._id === id);
    let statusOfBookmark = users[index].bookmark;
    statusOfBookmark === true
      ? (users[index].bookmark = false)
      : (users[index].bookmark = true);

    const newStatus = [...users];
    setUsers(newStatus);
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookmark={handleToggleBookmark}
      ></Users>
    </>
  );
};
export default App;
