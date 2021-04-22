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

			<div className={`card__cta`}>
				<div className="button__group">
					{buttons &&
						buttons.map(({ text, link, onClick, disabled }) => {
							return (
								<Link key={link} to={link ? link : null}>
									<button
										onClick={onClick}
										className="btn btn--white card__btn"
										style={{
											width: "100%",
											height: "100%",
										}}
										disabled={disabled}
									>
										{text}
									</button>
								</Link>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Card;
