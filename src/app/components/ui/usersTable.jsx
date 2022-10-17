import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({
    users,
    onSort,
    selectedSort,
    onToggleBookmark,
    // onDelete,
    ...rest
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link className="nav-link" to={`/users/${user._id}`}>
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: {
            name: "Профессии",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился,раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <span type="button" onClick={() => onToggleBookmark(user._id)}>
                    <Bookmark status={user.bookmark} />
                </span>
            )
        }
        // delete: {
        //     component: (user) => (
        //         <button
        //             type="button"
        //             className="btn btn-danger"
        //             onClick={() => onDelete(user._id)}
        //         >
        //             delete
        //         </button>
        //     )
        // }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
    // onDelete: PropTypes.func.isRequired
};

export default UsersTable;
