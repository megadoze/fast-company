import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import { validator } from "../../../utils/validator";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
// import { useUser } from "../../../hooks/useUsers";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfessions";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    // const { getUserById } = useUser();
    const { currentUser, updateUser } = useAuth();
    const { qualities } = useQualities();
    const { professions } = useProfessions();

    // const user = getUserById(userId);

    const [data, setData] = useState({
        name: "",
        email: "",
        sex: "male",
        profession: "",
        qualities: []
    });

    const [errors, setErrors] = useState({});

    const transformQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem === qualities[quality]._id) {
                    qualitiesArray.push({
                        label: qualities[quality].name,
                        value: qualities[quality]._id
                        // color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };
    const qualitiesArray = transformQualities(data.qualities);
    console.log("QualitiesArray", qualitiesArray);

    useEffect(() => {
        setData(currentUser);
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await updateUser(newData);
            history.replace(`/users/${userId}`);
        } catch (error) {
            setErrors(error);
        }
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
                        {/* {user && professions && qualities ? ( */}
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
                                defaultValue={transformQualities(
                                    data.qualities
                                )}
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
                        {/* ) : (
                            "loading..."
                        )} */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditUserPage;
