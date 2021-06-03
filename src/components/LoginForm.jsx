import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Joi from "joi-browser";
import useForm from "./common/Form/useForm";
import authService from "./../services/authService";
import { UserContext } from "../contexts/userContext";
import StartupForm from "./common/StartupForm/StartupForm";

const LoginForm = () => {
    const { user } = useContext(UserContext);

    const [data, setData] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});

    const location = useLocation();

    const {
        handleSubmit,
        renderTextInput,
        renderSubmitButton,
        renderResetButton,
    } = useForm({
        data,
        setData,
        errors,
        setErrors,
        doSubmit,
        requiresValidation: true,
        schema: {
            username: Joi.string().min(3).max(255).email().required(),
            password: Joi.string().min(5).max(255).required(),
        },
    });

    const formData = {
        heading: "Login",
        description:
            "Get Personalized access to your Exams, Results and Recommendations",
        link: {
            title: "New to Online examination? Create an account",
            to: "/signup",
        },
    };

    async function doSubmit() {
        try {
            await authService.login(data.username, data.password);
            const { state } = location;
            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = {};
                errors.server = error.response.data;
                setErrors(errors);
            }
        }
    }

    if (user) return <Redirect to="/exams" />;
    const { server: serverError } = errors;

    return (
        <StartupForm formData={formData}>
            <form className="form" onSubmit={handleSubmit}>
                <div
                    className={`form__error form__error--server ${
                        serverError ? "" : "u-hidden"
                    }`}
                >
                    {serverError || "error"}
                </div>
                {renderTextInput({
                    name: "username",
                    label: "Username",
                    placeholder: "Username",
                    className: "welcome-form__input",
                    formGroupClassName: "welcome-form__group",
                    formLabelClassName: "welcome-form__label",
                    autoFocus: true,
                })}
                {renderTextInput({
                    name: "password",
                    label: "Password",
                    className: "welcome-form__input",
                    formLabelClassName: "welcome-form__label",
                    formGroupClassName: "welcome-form__group",
                    placeholder: "Password",
                    type: "password",
                })}
                <div className="form__button-group">
                    {renderSubmitButton({
                        className: "welcome__btn welcome__btn--green",
                    })}
                    {renderResetButton({
                        className: "welcome__btn welcome__btn--green",
                    })}
                </div>
            </form>
        </StartupForm>
    );
};

export default LoginForm;
