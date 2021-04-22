import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import ResultProvider from "../../contexts/resultContext";
import cardMaps from "../../utilities/cardMaps";
import ExamsList from "../Exams/ExamsList";
import ResultsTable from "./ResultsTable";
import AnswerTable from "./AnswerTable";
import "./Results.scss";

const Results = () => {
	return (
		<section className="section-content">
			<ResultProvider>
				<Switch>
					<Route
						path="/exams/results/all"
						render={(props) => (
							<ExamsList
								{...props}
								mapToCardModel={cardMaps.resultsMap}
							/>
						)}
					/>
					<Route
						path="/exams/results/:examId/:resultId"
						render={(props) => <AnswerTable />}
					/>
					<Route
						path="/exams/results/:examId"
						render={(props) => <ResultsTable />}
					/>
					<Redirect
						exact
						from="/exams/results"
						to="/exams/results/all"
					/>
				</Switch>
			</ResultProvider>
		</section>
	);
};

export default Results;
