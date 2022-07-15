import React from "react";

const Quality = ({ color, name }) => {
  return <span className={"badge me-1 bg-" + color}>{name}</span>;
};

export default Quality;
