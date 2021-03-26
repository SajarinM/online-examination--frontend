import React, { Component } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Sidebar from "./common/Sidebar/Sidebar";
import Requests from "./Requests/Requests";
import SendRequest from "./Requests/SendRequest";

class Teachers extends Component {
	state = {};

	sidebarNavlinks = [
		{ label: "Send Request", route: "/teachers/sendrequest" },
		{ label: "Requests", route: "/teachers/requests" },
		{ label: "My Teachers", route: "/teachers/myteachers" },
	];

	render() {
		return (
			<section className="section">
				<Sidebar navlinks={this.sidebarNavlinks} />
				<main className="section__content">
					<Switch>
						<Route
							path="/teachers/sendrequest"
							component={SendRequest}
						/>
						<Route path="/teachers/requests" component={Requests} />
						<Redirect
							exact
							from="/teachers"
							to="/teachers/myteachers"
						/>
					</Switch>
				</main>
			</section>
		);
	}
}

export default Teachers;
