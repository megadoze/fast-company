import React from "react";
import Quality from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    bookmark,
    onToggleBookmark,
    onDelete
}) => {
    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    {qualities.map((quality) => (
                        <Quality key={quality._id} {...quality} />
                    ))}
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate} /5</td>
                <td className="text-center">
                    <span type="button" onClick={() => onToggleBookmark(_id)}>
                        <Bookmark status={bookmark} />
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onDelete(_id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.object.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};
export default User;
