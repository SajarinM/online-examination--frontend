import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Sidebar from "./common/Sidebar/Sidebar";
import Requests from "./Requests/Requests";
import { UserContext } from "./../contexts/userContext";
import Profile from "./Profile/Profile";

const MyProfile = () => {
	const user = useContext(UserContext);

	const sidebarNavlinks = [
		{
			label: "Profile Info",
			route: "/account/info",
			icon: { name: "user-solid-circle" },
		},
		{
			label: "Requests",
			route: "/account/requests",
			icon: { name: "envelope" },
		},
		{
			label: "My Students",
			route: "/account/mystudents",
			icon: { name: "group" },
			renderCondition: user && user.type === "teacher",
		},
		{
			label: "My Teachers",
			route: "/account/mystudents",
			icon: { name: "group" },
			renderCondition: user && user.type === "student",
		},
	];

	return (
		<section className="section">
			<Sidebar navlinks={sidebarNavlinks} />
			<main className="section__content">
				<Switch>
					<Redirect exact from="/account" to="/account/info" />
					<Route path="/account/requests" component={Requests} />
					<Route path="/account/info" component={Profile} />
				</Switch>
			</main>
		</section>
	);
};

export default MyProfile;
