import React, { Fragment, useContext } from "react";
import { Redirect, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ExamContext } from "../../contexts/examContext";
import { ResultContext } from "../../contexts/resultContext";
import { UserContext } from "../../contexts/userContext";
import Table from "../common/Table/Table";
import "./Results.scss";

const ResultsTable = () => {
	const user = useContext(UserContext);
	const { publishResults } = useContext(ExamContext);
	const { results } = useContext(ResultContext);

	const { examId } = useParams();

	const columns = [
		{
			label: "Student",
			path: "student.name",
		},
		{
			key: "view_answers",
			content: (result) => (
				<Link to={`${examId}/${result._id}`}>View Answers</Link>
			),
		},
	];

	if (user.isTeacher)
		return (
			<Fragment>
				<button
					onClick={() => {
						publishResults(examId);
					}}
				>
					Publish Result
				</button>

				<Table columns={columns} data={results} serialNo="No" />
			</Fragment>
		);
	const result = results.find((r) => r.exam._id === examId);
	if (!result) return null;
	return <Redirect to={`/exams/results/${examId}/${result._id}`} />;
};

export default ResultsTable;
