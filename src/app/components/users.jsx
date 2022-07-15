import React from "react";
import User from "./user";
// import api from "../api";

const Users = ({ users, onDelete, onToggleBookmark }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col" className="text-center">
              Избранное
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User
              key={user._id}
              {...user}
              onDelete={onDelete}
              onToggleBookmark={onToggleBookmark}
            ></User>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
