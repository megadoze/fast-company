import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import User from "./user";
import api from "../api";
import { paginate } from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id)
        : allUsers;

    const count = filteredUsers.length;

    const userCrop = paginate(filteredUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <SearchStatus length={count} />
                {count > 0 && (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "250px" }}>
                                    Имя
                                </th>
                                <th scope="col" style={{ width: "300px" }}>
                                    Качества
                                </th>
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
                            {userCrop.map((user) => (
                                <User key={user._id} {...user} {...rest}></User>
                            ))}
                        </tbody>
                    </table>
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
export default Users;
