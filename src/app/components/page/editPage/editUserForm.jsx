import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const EditUserForm = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    // console.log(history.location);

    const [data, setData] = useState({
        name: "",
        email: "",
        sex: "male",
        profession: "",
        qualities: []
    });

    const [professions, setProfession] = useState([]);
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.getById(userId).then(({ profession, qualities, ...data }) => {
            setData((prevState) => ({
                ...prevState,
                ...data,
                profession: profession.name,
                qualities: qualities.map((qual) => ({
                    value: qual._id,
                    label: qual.name
                }))
            }));
        });
    }, []);

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.label === id) {
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

    const handleReturn = () => {
        history.goBack();
    };

    const handleChange = (target) => {
        console.log(target);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => {
                setData(data);
            });
        history.replace(`/users/${userId}`);
        console.log("Передаем", {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };
    return (
        <>
            <div className="container mt-5 mb-5">
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleReturn}
                >
                    Назад
                </button>
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h3 className="mb-4">Edit Page</h3>
                        {data._id ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберите вашу профессию"
                                    options={professions}
                                    defaultOption="Choose..."
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                />
                                <RadioField
                                    label="Ваш пол"
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                />
                                <MultiSelectField
                                    label="Выберите качества"
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        ) : (
                            "loading..."
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUserForm;
