import React, { useState } from "react";
import Joi from "joi-browser";
import useForm from "./common/Form/useForm";

export const ExpForm = () => {
	const [data, setData] = useState({ username: "saju" });
	const [errors, setErrors] = useState({});

	const {
		handleSubmit,
		renderTextInput,
		renderSubmitButton,
		renderResetButton,
	} = useForm({
		data,
		setData,
		errors,
		initialData: { username: "saju" },
		setErrors,
		doSubmit: function () {
			console.log(data);
		},
		requiresValidation: true,
		schema: {
			username: Joi.string().min(3).max(255).email().required(),
		},
	});
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{renderTextInput({
					name: "username",
					label: "Username",
				})}
				{renderSubmitButton()}
				{renderResetButton()}
			</form>
			<button
				onClick={() => {
					console.log(data);
				}}
			>
				see data
			</button>
		</div>
	);
};

export const ExpForm2 = () => {
	const [data, setData] = useState({ username: "" });
	const [errors, setErrors] = useState({});

	const { handleSubmit, renderTextInput, renderSubmitButton } = useForm({
		data,
		setData,
		errors,
		setErrors,
		doSubmit: function () {
			console.log(data);
		},
		requiresValidation: false,
	});
	return (
		<div>
			<form onSubmit={handleSubmit}>
				{renderTextInput({
					name: "username",
					label: "Username",
				})}
				{renderSubmitButton()}
			</form>
			<button
				onClick={() => {
					console.log(data);
				}}
			>
				see data
			</button>
		</div>
	);
};
