import React, { useContext, useState } from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/userContext";
import { RequestContext } from "../../contexts/requestContext";
import useForm from "../common/Form/useForm";

const SendRequest = () => {
	const user = useContext(UserContext);
	const { addRequest } = useContext(RequestContext);

	const [data, setData] = useState({ teacherUsername: "" });
	const [errors, setErrors] = useState({});

	const { handleSubmit, renderTextInput, renderSubmitButton } = useForm({
		data,
		setData,
		errors,
		setErrors,
		doSubmit,
		requiresValidation: true,
		schema: {
			teacherUsername: Joi.string()
				.min(3)
				.max(255)
				.email()
				.required()
				.label("Teacher Username"),
		},
	});

	async function doSubmit() {
		try {
			await addRequest(data.teacherUsername, user.username);
			toast.success("Successfully Sent Request to Your Teacher");
		} catch (error) {
			if (error.response && error.response.status === 400) {
				const newErrors = { ...errors };
				newErrors.teacherUsername = error.response.data;
				setErrors(newErrors);
			}
		}
	}

	return (
		<form className="form" onSubmit={handleSubmit}>
			<div className="row p-y-1 b-b-1">
				<div className="col-3-of-4 u-flex-center">
					{renderTextInput({
						name: "teacherUsername",
						placeholder: "Enter teacher id.......",
						formGroupClassName:
							"form-group u-flex-center m-x-1 fl-1",
						formErrorClassName: "form__error--popup",
						autoFocus: true,
					})}
				</div>
				<div className="col-1-of-4 u-flex-center m-x-0">
					{renderSubmitButton(
						"Send",
						"btn btn--blue u-flex-center fl-8"
					)}
				</div>
			</div>
		</form>
	);
};

export default SendRequest;

// class SendRequest extends Form {
// 	static contextType = RequestContext;

// 	state = {
// 		data: { teacherUsername: "" },
// 		errors: {},
// 		requiresValidation: true,
// 	};
// 	componentDidMount() {
// 		console.log(this.context);
// 	}

// 	schema = {
// 		teacherUsername: Joi.string()
// 			.min(3)
// 			.max(255)
// 			.email()
// 			.required()
// 			.label("Teacher Username"),
// 	};

// 	doSubmit = async () => {
// 		const { addRequest } = this.context;
// 		try {
// 			await addRequest(this.state.data);
// 			toast.success("Successfully Sent Request to Your Teacher");
// 		} catch (error) {
// 			if (error.response && error.response.status === 400) {
// 				const errors = { ...this.state.errors };
// 				errors.teacherUsername = error.response.data;
// 				this.setState({ errors });
// 			}
// 		}
// 	};

// 	render() {
// 		return (
// 			<form className="form" onSubmit={this.handleSubmit}>
// 				<div className="row p-y-1 b-b-1">
// 					<div className="col-3-of-4 u-flex-center">
// 						{this.renderTextInput({
// 							name: "teacherUsername",
// 							placeholder: "Enter teacher id.......",
// 							formGroupClassName:
// 								"form-group u-flex-center m-x-1 fl-1",
// 							formErrorClassName: "form__error--popup",
// 							autoFocus: true,
// 						})}
// 					</div>
// 					<div className="col-1-of-4 u-flex-center m-x-0">
// 						{this.renderSubmitButton(
// 							"Send",
// 							"btn btn--blue u-flex-center fl-8"
// 						)}
// 					</div>
// 				</div>
// 			</form>
// 		);
// 	}
// }

// export default SendRequest;
