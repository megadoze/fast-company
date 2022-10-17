import React, { useState } from "react";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        clearForm();
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <TextAreaField
                            label="Сообщение"
                            name="content"
                            value={data.content || ""}
                            onChange={handleChange}
                            error={errors.content}
                        />
                        <button className="btn btn-primary float-end">
                            Опубликовать
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
