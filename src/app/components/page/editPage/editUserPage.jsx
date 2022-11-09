import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validator";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const EditUserPage = () => {
    const history = useHistory();
    // const params = useParams();
    // const { userId } = params;
    const [isLoading, setIsLoading] = useState(true);
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();
    // dispatch(updateUser());
    const [data, setData] = useState();
    const [errors, setErrors] = useState({});

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const professions = useSelector(getProfessions());
    const professionLoading = useSelector(getProfessionsLoadingStatus());

    function transformQualities(qualitiesIds) {
        const qualitiesArray = [];
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality);
                    break;
                }
            }
        }
        return qualitiesArray;
    }
    // const qualitiesArray = transformQualities(data.qualities);

    const transformData = (data) => {
        const result = transformQualities(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }));
        return result;
    };

    useEffect(() => {
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            });
        }
    }, [professionLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false);
        }
    }, [data]);

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const handleReturn = () => {
        history.goBack();
    };

    const handleChange = (target) => {
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
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        dispatch(updateUser(newData));
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
                        {!isLoading && Object.keys(professions).length > 0 ? (
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
                                    options={professionList}
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
                                    options={qualitiesList}
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

export default EditUserPage;
