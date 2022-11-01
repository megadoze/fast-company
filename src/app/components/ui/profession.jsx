import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
    getProfessionById,
    getProfessionsLoadingStatus,
    loadProfessions
} from "../../store/professions";
import { useDispatch, useSelector } from "react-redux";

const Profession = ({ id }) => {
    const dispatch = useDispatch();

    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));

    useEffect(() => {
        dispatch(loadProfessions());
    }, []);

    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Loading...";
    }
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
