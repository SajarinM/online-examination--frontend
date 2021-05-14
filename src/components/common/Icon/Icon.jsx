import React from "react";
import Icons from "../../../assets/icons/icons.svg";
import "./icon.scss";

const Icon = ({ name, color, size, className, ...rest }) => {
	return (
		<svg
			{...rest}
			className={`icon icon-${name} ${className}`}
			fill={color}
			style={{ width: size, height: size }}
		>
			<use xlinkHref={`${Icons}#icon-${name}`} />
		</svg>
	);
};

export default Icon;
