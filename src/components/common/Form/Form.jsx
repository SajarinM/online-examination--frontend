import React, { Component } from "react";
import Joi from "joi-browser";
import TextInput from "./TextInput";
import Select from "./Select";
import "./Form.scss";

class Form extends Component {
	state = {
		data: {},
		errors: {},
		requiresValidation: true,
	};

	handleSubmit = (e) => {
		e.preventDefault();
		if (this.state.requiresValidation) {
			const errors = this.validateAll();
			this.setState({ errors: errors || {} });
			if (errors) return;
		}
		this.doSubmit();
	};

	handleChange = ({ currentTarget }) => {
		let errors = {};
		if (this.state.requiresValidation) {
			errors = { ...this.state.errors };
			const errorMessage = this.validateProperty(currentTarget);
			if (errorMessage) errors[currentTarget.name] = errorMessage;
			else delete errors[currentTarget.name];
		}

		const data = { ...this.state.data };
		data[currentTarget.name] = currentTarget.value;

		this.setState({
			data,
			errors,
		});
	};

	validateAll = () => {
		const options = { abortEarly: false, allowUnknown: true };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ name, value }) => {
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		return error ? error.details[0].message : null;
	};

	resetForm = (e) => {
		e.preventDefault();
		const data = {};
		for (let item of Object.keys(this.state.data)) data[item] = "";
		this.setState({ data });
		this.setState({ errors: {} });
	};

	renderTextInput({
		name,
		type = "text",
		className = "form-control",
		formGroupClassName = "form-group",
		formErrorClassName = this.state.errorClassName || "form__error",
		...rest
	}) {
		const { data, errors } = this.state;
		return (
			<TextInput
				{...rest}
				onChange={this.handleChange}
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

	renderSubmitButton(label, className = "btn btn--blue") {
		return (
			<button
				disabled={this.state.requiresValidation && this.validateAll()}
				className={className}
			>
				{label}
			</button>
		);
	}

	renderResetButton(label, className = "btn btn--blue") {
		return (
			<button onClick={(e) => this.resetForm(e)} className={className}>
				Reset
			</button>
		);
	}

	renderSelect({
		name,
		label,
		options,
		className = "form-control",
		formGroupClassName = "form-group",
		formErrorClassName = this.state.errorClassName || "form__error",
		valuePath = "_id",
		...rest
	}) {
		const { data, errors } = this.state;
		return (
			<Select
				{...rest}
				name={name}
				label={label}
				options={options}
				value={data[name]}
				onChange={this.handleChange}
				error={errors[name]}
				valuePath={valuePath}
				className={className}
				formGroupClassName={formGroupClassName}
				formErrorClassName={formErrorClassName}
			/>
		);
	}
}

export default Form;
