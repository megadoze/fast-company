import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import api from "../../../api";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";

const UsersListPage = () => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "acs" });
    const [inputSearch, setInputSearch] = useState("");

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleChange = ({ target }) => {
        setSelectedProf();
        setInputSearch(target.value);
        // console.log(target.value);
    };

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, inputSearch]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setInputSearch("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : inputSearch
            ? users.filter((user) =>
                  user.name.toLowerCase().includes(inputSearch.toLowerCase())
              )
            : users;

        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);

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
                    <div className="input-group">
                        <input
                            type="text"
                            name="inputSearch"
                            className="form-control"
                            placeholder="Search..."
                            value={inputSearch}
                            onChange={handleChange}
                        />
                    </div>
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                        />
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
    }
    return "loading...";
};
UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;
