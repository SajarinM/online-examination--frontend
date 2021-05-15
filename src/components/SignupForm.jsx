import React, { useState } from "react";
import Joi from "joi-browser";
import userService from "../services/userService";
import authService from "../services/authService";
import useForm from "./common/Form/useForm";
import StartupForm from "./common/StartupForm/StartupForm";

const SignupForm = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
		type: "",
	});
	const [errors, setErrors] = useState({});

	const {
		handleSubmit,
		renderTextInput,
		renderSubmitButton,
		renderResetButton,
		renderSelect,
	} = useForm({
		data,
		setData,
		errors,
		setErrors,
		doSubmit,
		schema: {
			email: Joi.string().min(3).max(255).email().required(),
			name: Joi.string().min(3).max(50).required(),
			type: Joi.string(),
			password: Joi.string().min(5).max(255).required(),
		},
	});

	const userTypes = [
		{ id: 0, name: "Student" },
		{ id: 1, name: "Teacher" },
	];

	const formData = {
		heading: "Sign up",
		description:
			"Looks like you're new here! Sign up with your mobile number to get started",
		link: {
			title: "Existing User ? Login",
			to: "/login",
		},
	};

	async function doSubmit() {
		try {
			const { headers } = await userService.register(data);
			authService.loginWithJwt(headers["x-auth-token"]);
			window.location = "/";
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const errors = {};
				errors.server = error.response.data;
				setErrors(errors);
			}
		}
	}

	const { server: serverError } = errors;

	return (
		<StartupForm formData={formData}>
			<form
				className="welcome__form"
				onSubmit={handleSubmit}
				autoComplete="off"
			>
				<div
					className={`form__error form__error--server ${
						serverError ? "" : "u-hidden"
					}`}
				>
					{serverError || "error"}
				</div>
				<div className="row">
					{renderSelect({
						name: "type",
						label: "User Type",
						options: userTypes,
						formGroupClassName:
							"form-group col-1-of-2 welcome-form__group",
						placeholder: "User Type",
						className: "welcome-form__input",
						formLabelClassName: "welcome-form__label",
					})}
					{renderTextInput({
						name: "name",
						label: "Name",
						autoFocus: true,
						formGroupClassName:
							"form-group col-1-of-2 welcome-form__group",
						placeholder: "Name",
						className: "welcome-form__input",
						formLabelClassName: "welcome-form__label",
					})}
				</div>

				<div className="row">
					{renderTextInput({
						name: "email",
						label: "Email",
						formGroupClassName:
							"form-group col-1-of-2 welcome-form__group",
						placeholder: "Email",
						className: "welcome-form__input",
						formLabelClassName: "welcome-form__label",
					})}
					{renderTextInput({
						name: "password",
						label: "Password",
						type: "password",
						formGroupClassName:
							"form-group col-1-of-2 welcome-form__group",
						placeholder: "Password",
						className: "welcome-form__input",
						formLabelClassName: "welcome-form__label",
					})}
				</div>

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

export default SignupForm;
