import React from "react";
import { Link } from "react-router-dom";
import string from "../../../utilities/string";
import "./Card.scss";

const Card = ({ title, details, buttons, isHoverEnabled }) => {
	return (
		<div className={`card ${isHoverEnabled ? "card--animated" : ""}`}>
			<div className={`card__title-box`}>
				<h4 className="card__title">
					{string.reduceString(title, 16)}
				</h4>
			</div>

			<div className="card__details">
				<ul>
					{details.map((detail) => (
						<li key={detail}>{detail}</li>
					))}
				</ul>
			</div>

			<div className="card__cta">
				{buttons &&
					buttons.map(
						({
							text,
							icon,
							className,
							link,
							onClick,
							disabled,
						}) => {
							return (
								<Link
									key={link}
									to={link ? link : null}
									onClick={onClick}
									className={`btn btn-small card__btn ${className}`}
									disabled={disabled}
								>
									{icon && icon}
									{text && text}
								</Link>
							);
						}
					)}
			</div>
		</div>
	);
};

export default Card;
