import React, { useState, useEffect } from "react";
import api from "../../api";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";
import TextAreaField from "../common/form/textAreaField";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});

    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);

    const arrayOfUsers =
        users &&
        Object.keys(users).map((data) => ({
            value: users[data]._id,
            label: users[data].name
        }));

    const clearForm = () => {
        setData(initialData);
        // setErrors({});
    };
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
        clearForm();
        console.log(data);
    };

    return (
        <div className="card mb-2">
            <div className="card-body">
                <div>
                    <h2>New comment</h2>
                    <form onSubmit={handleSubmit}>
                        <SelectField
                            onChange={handleChange}
                            options={arrayOfUsers}
                            defaultOption="Выберите пользователя"
                            name="userId"
                            value={data.userId}
                        />
                        <TextAreaField
                            label="Сообщение"
                            name="content"
                            value={data.content}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            // disabled={!isValid}
                            className="btn btn-primary float-end"
                        >
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
