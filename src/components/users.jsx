import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  let counter = users.length;

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user !== id));
  };

  const renderPhrase = () => {
    return counter === 2 || counter === 3 || counter === 4
      ? counter + " человека тусанут с тобой сегодня"
      : counter === 0
      ? "Никто с тобой не тусанет"
      : counter + " человек тусанет с тобой сегодня";
  };

  const getBageClasses = () => {
    let classes = "badge ";
    classes += counter === 0 ? "bg-danger" : "bg-primary";
    return classes;
  };

  const renderUser = users.map((user) => (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>
        {user.qualities.map((quality) => (
          <span className={"badge me-1 bg-" + quality.color} key={quality._id}>
            {quality.name}{" "}
          </span>
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate} /5</td>
      <td className="text-center">
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(user)}
        >
          delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h3>
        <span className={getBageClasses()}>{renderPhrase()}</span>
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUser}</tbody>
      </table>
    </>
  );
};

export default Users;
