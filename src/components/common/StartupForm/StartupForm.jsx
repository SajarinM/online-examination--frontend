import React from "react";
import { Link } from "react-router-dom";
import "./StartupForm.scss";

const StartupForm = ({ formData, children }) => {
	const { heading, link } = formData;
	return (
		<section className="section-welcome">
			<div className="welcome">
				<div className="welcome-form">
					<div className="u-margin-bottom-small">
						<h2 className="welcome-form__heading">{heading}</h2>
					</div>
					{children}
					{link && (
						<div className="welcome__link">
							<Link to={link.to}>{link.title}</Link>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default StartupForm;
