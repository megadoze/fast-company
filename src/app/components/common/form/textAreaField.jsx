import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
        // console.log(target.value);
    };
    // const getInputClasses = () => {
    //     return "form-control" + (error ? " is-invalid" : " is-valid");
    // };
    return (
        <div className="mb-4">
            <label htmlFor="floatingTextarea2" className="form-label">
                {label}
            </label>
            <textarea
                name={name}
                className="form-control"
                id={name}
                rows="3"
                onChange={handleChange}
                value={value}
                required
            >
                {/* {error && <div className="invalid-feedback ">{error}</div>} */}
            </textarea>
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    error: PropTypes.string
};

export default TextAreaField;
