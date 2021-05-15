import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../../contexts/userContext";
import { ExamContext } from "./../../../contexts/examContext";
import Icon from "../Icon/Icon";
import logo from "../../../assets/images/logo.png";
import profile from "../../../assets/icons/profile.svg";
import "./Sidebar.scss";

const Sidebar = () => {
	const { user } = useContext(UserContext);
	const { writeMode } = useContext(ExamContext);

	const navlinks = [
		{
			label: "Exams",
			route: "/exams",
			icon: { name: "document-edit" },
		},
		{
			label: "Students",
			route: "/students",
			renderCondition: Boolean(user && user.isTeacher),
			icon: { name: "graduation-cap" },
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
			icon: { name: "bubble" },
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
		<div
			className={`sidebar ${!user || writeMode ? "sidebar-hidden" : ""}`}
		>
			<div className="logo-box">
				<img src={logo} alt="trillo logo" className="logo" />
				<div className="text-box">
					<p>online </p>
					<p>examination</p>
				</div>
			</div>
			<div className="sidebar__profile">
				<img src={profile} alt="profile" className="profile__img" />
				<div className="profile__greet">
					<h2>{user && user.name}</h2>
				</div>
			</div>
			<ul className="sidebar-nav">
				{navlinks.map((navlink) => {
					const { route, label, icon, renderCondition } = navlink;
					if (renderCondition === false) return null;
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
