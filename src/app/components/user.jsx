import React from "react";
import Quality from "./qualitie";
import Bookmark from "./bookmark";

const User = (props) => {
  return (
    <>
      <tr key={props.id}>
        <td>{props.name}</td>
        <td>
          {props.qualities.map((quality) => (
            <Quality
              key={quality._id}
              color={quality.color}
              name={quality.name}
              _id={quality._id}
            />
          ))}
        </td>
        <td>{props.name}</td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate} /5</td>
        <td className="text-center">
          <span type="button" onClick={() => props.onToggleBookmark(props._id)}>
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
export default User;
