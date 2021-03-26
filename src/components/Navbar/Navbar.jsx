import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
// import { userTypes } from "../../services/authService";
import { UserContext } from "../../contexts/userContext";
import Icon from "../common/Icon/Icon";
import logo from "../../assets/images/logo.png";
import "./Navbar.scss";

const Navbar = () => {
	const user = useContext(UserContext);

	const navItems = [
		{
			label: "Exams",
			to: "/exams",
			renderCondition: user,
			icon: { name: "edit-pencil" },
		},
		// {
		// 	label: "Students",
		// 	to: "/students",
		// 	renderCondition: user && user.type === userTypes.teacher,
		// 	icon: { name: "location-restroom" },
		// },
		// {
		// 	label: "Teachers",
		// 	to: "/teachers",
		// 	renderCondition: user && user.type === userTypes.student,
		// 	icon: { name: "location-restroom" },
		// },
		{
			label: "My Profile",
			to: "/account",
			renderCondition: user,
			icon: { name: "user-solid-circle" },
		},
		{
			label: "Logout",
			to: "/logout",
			renderCondition: user,
			icon: { name: "stand-by" },
		},
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

	// return (
	// 	<nav className="navbar">
	// 		<div className="navbar__icon-box">
	// 			<NavLink className="navbar__icon" to="/">
	// 				Logo
	// 			</NavLink>
	// 		</div>

	// 		<div className="navbar-container">
	// 			<ul className="navbar-nav">
	// 				{navItems.map(
	// 					(item) =>
	// 						item.renderCondition && (
	// 							<li
	// 								className={
	// 									item.align === "right"
	// 										? "navbar-nav__item navbar-nav__right"
	// 										: "navbar-nav__item"
	// 								}
	// 								key={item.to}
	// 							>
	// 								<NavLink
	// 									activeClassName="navbar-nav__link--active"
	// 									className="navbar-nav__link"
	// 									to={item.to}
	// 								>
	// 									{item.label}
	// 								</NavLink>
	// 							</li>
	// 						)
	// 				)}
	// 			</ul>
	// 		</div>
	// 	</nav>
	// );

	return (
		<header className="header">
			<img src={logo} alt="trillo logo" className="logo" />

			<nav className="nav">
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
									{icon && (
										<Icon
											className="nav__icon"
											name={icon.name}
										/>
									)}
									<p>{label}</p>
								</div>
							</NavLink>
						)
					);
				})}
			</nav>

			{/* <div class="user-nav__icon-box">
					<svg class="user-nav__icon">
						<use xlink:href="img/sprite.svg#icon-bookmark"></use>
					</svg>
					<span class="user-nav__notification">7</span>
				</div>
				<div class="user-nav__icon-box">
					<svg class="user-nav__icon">
						<use xlink:href="img/sprite.svg#icon-chat"></use>
					</svg>
					<span class="user-nav__notification">13</span>
				</div>
				<div class="user-nav__user">
					<img
						src="img/user.jpg"
						alt="User photo"
						class="user-nav__user-photo"
					/>
					<span class="user-nav__user-name">Jonas</span>
				</div> */}
		</header>
	);
};

export default Navbar;
