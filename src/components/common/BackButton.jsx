import React from "react";
import { useHistory } from "react-router";
import Icon from "./Icon/Icon";

const BackButton = ({ className }) => {
	const history = useHistory();
	return (
		<button
			onClick={(e) => {
				e.preventDefault();
				history.goBack();
			}}
			className={className + " back-button "}
		>
			<Icon name="arrow-left" size="15" />
		</button>
	);
};

export default BackButton;
