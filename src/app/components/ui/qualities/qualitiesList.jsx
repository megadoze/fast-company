import React from "react";
import PropTypes from "prop-types";
import Quality from "./qualitie";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading...";

    return (
        <>
            {qualities.map((quality) => (
                <Quality key={quality} id={quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
