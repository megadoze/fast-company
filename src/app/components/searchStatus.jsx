import React from "react";

const SearchStatus = ({ length }) => {
  let counter = length;

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
  return (
    <h3>
      <span className={getBageClasses()}>{renderPhrase()}</span>
    </h3>
  );
};
export default SearchStatus;
