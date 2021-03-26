import React from "react";
import Joi from "joi-browser";
import TextInput from "./TextInput";
import Select from "./Select";
import "./Form.scss";

const useForm = ({
	data,
	setData,
	errors,
	setErrors,
	initialData,
	doSubmit,
	requiresValidation = true,
	schema,
	errorClassName,
}) => {
	function handleSubmit(e) {
		e.preventDefault();
		if (requiresValidation) {
			const newErrors = validateAll();
			setErrors(newErrors || {});
			if (newErrors) return;
		}
		doSubmit();
	}

	function handleChange({ currentTarget }) {
		let newErrors = {};
		if (requiresValidation) {
			newErrors = { ...errors };
			const errorMessage = validateProperty(currentTarget);
			if (errorMessage) newErrors[currentTarget.name] = errorMessage;
			else delete newErrors[currentTarget.name];
		}

		const newData = { ...data };
		newData[currentTarget.name] = currentTarget.value;

		setData(newData);
		setErrors(newErrors);
	}

	function validateAll() {
		const options = { abortEarly: false, allowUnknown: true };
		const { error } = Joi.validate(data, schema, options);
		if (!error) return null;

		const newErrors = {};
		for (let item of error.details) newErrors[item.path[0]] = item.message;
		return newErrors;
	}

	function validateProperty({ name, value }) {
		const obj = { [name]: value };
		const propertySchema = { [name]: schema[name] };
		const { error } = Joi.validate(obj, propertySchema);
		return error ? error.details[0].message : null;
	}

	function resetForm(e) {
		e.preventDefault();
		let newData = {};
		if (initialData) {
			newData = initialData;
		} else {
			for (let item of Object.keys(data)) newData[item] = "";
		}
		setData(newData);
		setErrors({});
	}

	function renderTextInput({
		name,
		type = "text",
		className = "form-control",
		formGroupClassName = "form-group",
		formErrorClassName = errorClassName || "form__error",
		...rest
	}) {
		return (
			<TextInput
				{...rest}
				onChange={handleChange}
				name={name}
				type={type}
				value={data[name]}
				error={errors[name]}
				className={className}
				formGroupClassName={formGroupClassName}
				formErrorClassName={formErrorClassName}
			/>
		);
	}

	function renderSelect({
		name,
		label,
		options,
		className = "form-control",
		formGroupClassName = "form-group",
		formErrorClassName = errorClassName || "form__error",
		valuePath = "_id",
		...rest
	}) {
		return (
			<Select
				{...rest}
				name={name}
				label={label}
				options={options}
				value={data[name]}
				onChange={handleChange}
				error={errors[name]}
				valuePath={valuePath}
				className={className}
				formGroupClassName={formGroupClassName}
				formErrorClassName={formErrorClassName}
			/>
		);
	}

	function renderSubmitButton(label = "submit", className = "btn btn--blue") {
		return (
			<button
				disabled={requiresValidation && validateAll()}
				className={className}
			>
				{label}
			</button>
		);
	}

	function renderResetButton(label = "reset", className = "btn btn--blue") {
		return (
			<button onClick={(e) => resetForm(e)} className={className}>
				{label}
			</button>
		);
	}

	return {
		handleSubmit,
		renderTextInput,
		renderSelect,
		renderSubmitButton,
		renderResetButton,
	};
};

export default useForm;
