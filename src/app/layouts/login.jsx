import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type = "login" } = useParams();
    console.log(type);

    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <RegisterForm />
                            <p>
                                Already have account?
                                <Link
                                    className="ms-2"
                                    role="button"
                                    onClick={toggleFormType}
                                    to={`/login`}
                                >
                                    Sign In
                                </Link>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            <p>
                                Dont have account?
                                <Link
                                    className="ms-2"
                                    role="button"
                                    onClick={toggleFormType}
                                    to={`/login/register`}
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
