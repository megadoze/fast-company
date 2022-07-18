import React from "react";
import Quality from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = (props) => {
    return (
        <>
            <tr key={props.id}>
                <td>{props.name}</td>
                <td>
                    {props.qualities.map((quality) => (
                        <Quality
                            key={quality._id}
                            // color={quality.color}
                            // name={quality.name}
                            // _id={quality._id}
                            {...quality}
                        />
                    ))}
                </td>
                <td>{props.name}</td>
                <td>{props.completedMeetings}</td>
                <td>{props.rate} /5</td>
                <td className="text-center">
                    <span
                        type="button"
                        onClick={() => props.onToggleBookmark(props._id)}
                    >
                        <Bookmark status={props.bookmark} />
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => props.onDelete(props._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};
User.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    _id: PropTypes.string.isRequired
};
export default User;
