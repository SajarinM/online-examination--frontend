import React, { useState } from "react";
import "./TextButton.scss";

const TextButton = ({
	button,
	input = { type: "text" },
	doSubmit = () => {},
}) => {
	const [value, setValue] = useState("");
	const [enabled, setEnabled] = useState(false);

	return (
		<div className="text-button">
			{!enabled && (
				<button
					onClick={() => setEnabled(true)}
					className="text-button__button"
				>
					{button.label}
				</button>
			)}
			{enabled && (
				<input
					type={input.type}
					value={value}
					className="text-button__input"
					onChange={(e) => setValue(e.currentTarget.value)}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							doSubmit(value);
							setEnabled(false);
						}
					}}
					onBlur={() => {
						setEnabled(false);
					}}
					autoFocus
				/>
			)}
		</div>
	);
};

export default TextButton;
