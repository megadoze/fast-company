import React, { useState, useEffect } from "react";
import api from "../../api";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";
import TextAreaField from "../common/form/textAreaField";

const initialData = { userId: "", content: "" };

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData);
    const [users, setUsers] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        api.users.fetchAll().then(setUsers);
    }, []);

    const clearForm = () => {
        setData(initialData);
        // setErrors({});
    };

    const arrayOfUsers =
        users &&
        Object.keys(users).map((data) => ({
            value: users[data]._id,
            label: users[data].name
        }));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(data);
        clearForm();
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
