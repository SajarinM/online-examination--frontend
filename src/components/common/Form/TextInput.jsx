import React from "react";

const TextInput = ({
	name,
	error,
	label,
	formGroupClassName,
	formErrorClassName,
	formLabelClassName,
	...rest
}) => {
	return (
		<div className={formGroupClassName}>
			{label && (
				<label className={formLabelClassName} htmlFor={name}>
					{label}
				</label>
			)}
			<input {...rest} name={name} id={name} />
			<div className={`${formErrorClassName} ${error ? "" : "u-hidden"}`}>
				{error || "error"}
			</div>
		</div>
	);
};

export default TextInput;
