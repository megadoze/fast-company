import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "acs" });
    const [inputSearch, setInputSearch] = useState("");

    const currentUserId = useSelector(getCurrentUserId());

    const users = useSelector(getUsersList());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const handleDelete = (id) => {
        const newArrOfUsers = users.filter((user) => user._id !== id);
        // setUsers(newArrOfUsers);
        console.log(newArrOfUsers);
    };

    const handleChange = ({ target }) => {
        // console.log(target);
        setSelectedProf();
        setInputSearch(target.value);
    };

    const handleToggleBookmark = (id) => {
        const index = users.findIndex((user) => user._id === id);
        const statusOfBookmark = users[index].bookmark;
        statusOfBookmark === true
            ? (users[index].bookmark = false)
            : (users[index].bookmark = true);

        const newArrOfUsers = [...users];
        // setUsers(newArrOfUsers);
        console.log(newArrOfUsers);
    };

    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfession(data));
    // }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, inputSearch]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        console.log(item);
        setInputSearch("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        function filterUsers(data) {
            const filteredUsers = selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : inputSearch
                ? data.filter((user) =>
                      user.name
                          .toLowerCase()
                          .includes(inputSearch.toLowerCase())
                  )
                : data;
            return filteredUsers.filter((u) => u._id !== currentUserId);
        }
        const filteredUsers = filterUsers(users);
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
                {professions && !professionsLoading && (
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
