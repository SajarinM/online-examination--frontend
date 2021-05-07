import React from "react";
import { NavLink } from "react-router-dom";
import Icon from "../Icon/Icon";
import "./Sidebar.scss";

const Sidebar = ({ navlinks }) => {
	return (
		<div className="sidebar">
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
										name={icon.name}
										className="sidebar-nav__icon"
										style={{ fill: icon.fill }}
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
