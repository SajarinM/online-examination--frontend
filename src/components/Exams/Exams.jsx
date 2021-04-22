import React, { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ExamContext } from "../../contexts/examContext";
import { UserContext } from "../../contexts/userContext";
import cardMaps from "../../utilities/cardMaps";
import Sidebar from "../common/Sidebar/Sidebar";
import ExamForm from "../ExamForm/ExamForm";
import Results from "../Results/Results";
import ExamsList from "./ExamsList";

const Exams = () => {
	const user = useContext(UserContext);
	const examContext = useContext(ExamContext);

	const sidebarNavlinks = [
		{
			label: "Add Exam",
			route: "/exams/new",
			icon: { name: "add-outline" },
		},
		{
			label: "All Exams",
			route: "/exams/all",
			icon: { name: "edit-pencil" },
		},
	];

	if (user.type !== "teacher") {
		sidebarNavlinks.shift();
	}

	return (
		<section className="section">
			<Sidebar navlinks={sidebarNavlinks} />
			<main className="section__content">
				<Switch>
					<Route
						path="/exams/all"
						render={(props) => (
							<ExamsList
								{...props}
								mapToCardModel={cardMaps.allExamsMap}
							/>
						)}
					/>
					<Route path="/exams/results" component={Results} />
					<Route
						path="/exams/:id"
						render={(props) => (
							<ExamForm
								{...props}
								user={user}
								examContext={examContext}
							/>
						)}
					/>
					<Redirect exact from="/exams" to="/exams/all" />
				</Switch>
			</main>
		</section>
	);
};

export default Exams;
