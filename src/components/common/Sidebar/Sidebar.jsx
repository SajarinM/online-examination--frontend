import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import Icon from "../Icon/Icon";
import logo from "../../../assets/images/logo.png";
import "./Sidebar.scss";

const Sidebar = () => {
	const user = useContext(UserContext);

	const navlinks = [
		{
			label: "Exams",
			route: "/exams",
			icon: { name: "files-empty" },
		},
		{
			label: "Students",
			route: "/students",
			renderCondition: Boolean(user && user.isTeacher),
			icon: { name: "user-group" },
		},
		{
			label: "Teachers",
			route: "/teachers",
			renderCondition: Boolean(user && !user.isTeacher),
			icon: { name: "group" },
		},
		{
			label: "Requests",
			route: "/requests",
			icon: { name: "envelope" },
		},
		{
			label: "Profile",
			route: "/profile",
			icon: { name: "user-solid-circle" },
		},
		{
			label: "Logout",
			route: "/logout",
			icon: { name: "stand-by" },
		},
	];

	return (
		<div className="sidebar">
			<img src={logo} alt="trillo logo" className="logo" />
			<ul className="sidebar-nav">
				{navlinks.map((navlink) => {
					const { route, label, icon, renderCondition } = navlink;
					if (renderCondition === false) return null;
					console.log(icon);
					return (
						<li key={route} className="sidebar-nav__item">
							<NavLink
								to={route}
								className="sidebar-nav__link"
								activeClassName="sidebar-nav__link--active"
							>
								{icon && (
									<Icon
										className="sidebar-nav__icon"
										{...icon}
									/>
								)}
								<span>{label}</span>
							</NavLink>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default Sidebar;
