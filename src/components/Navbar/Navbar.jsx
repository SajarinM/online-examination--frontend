import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import logo from "../../assets/images/logo.png";
import "./Navbar.scss";

const Navbar = () => {
	const { user } = useContext(UserContext);

	const navItems = [
		{
			label: "Login",
			to: "/login",
			renderCondition: !user,
			align: "right",
		},
		{
			label: "SignUp",
			to: "/signup",
			renderCondition: !user,
		},
	];

	return (
		<header className="header">
			<nav className="nav">
				<img src={logo} alt="trillo logo" className="logo" />
				{navItems.map((item) => {
					const { to, renderCondition, align, label, icon } = item;
					return (
						renderCondition && (
							<NavLink
								key={to}
								activeClassName="nav__item--active"
								className={`nav__item ${
									align ? "nav__item--right" : ""
								}`}
								to={to}
							>
								<div className="nav__item-content">
									<p>{label}</p>
								</div>
							</NavLink>
						)
					);
				})}
			</nav>
		</header>
	);
};

export default Navbar;
