import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
    const { getQuality } = useQualities();
    const { color, name } = getQuality(id);
    return <span className={"badge me-1 bg-" + color}>{name}</span>;
};

Quality.propTypes = {
    id: PropTypes.string
};

export default Quality;
