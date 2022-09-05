import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
// import { validator } from "../../utils/validator";
import api from "../../api";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import PropTypes from "prop-types";

const EditUserForm = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                value: data[professionName]._id,
                label: data[professionName].name
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    if (professions) {
        console.log(professions);
    }

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.label === id) {
                console.log({ _id: prof.value, name: prof.label });
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleChange = (target) => {
        console.log(target);
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // const isValid = validate();
        // if (!isValid) return;
        const { profession, qualities } = user;
        api.users
            .update(userId, {
                ...user,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => setUser(data));
        history.push(`/users/${userId}`);
        console.log("Передаем", {
            ...user,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    return (
        <>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        // error={errors.email}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        // error={errors.email}
                    />
                    <SelectField
                        label="Выберите вашу профессию"
                        options={professions}
                        defaultOption="Choose..."
                        name="profession"
                        onChange={handleChange}
                        value={user.profession.name}
                        // error={errors.profession}
                    />
                    <RadioField
                        label="Ваш пол"
                        options={[
                            { name: "Male", value: "male" },
                            { name: "Female", value: "female" }
                        ]}
                        value={user.sex}
                        name="sex"
                        onChange={handleChange}
                    />
                    <MultiSelectField
                        label="Выберите качества"
                        options={qualities}
                        onChange={handleChange}
                        defaultValue={user.qualities}
                        name="qualities"
                    />
                    <button
                        type="submit"
                        // disabled={!isValid}
                        className="btn btn-primary w-100 mx-auto"
                    >
                        Обновить
                    </button>
                </form>
            ) : (
                "loading..."
            )}
        </>
    );
};

EditUserForm.propTypes = {
    userId: PropTypes.string
};

export default EditUserForm;
