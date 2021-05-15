import React, { Fragment, useContext } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { ExamContext } from "../../contexts/examContext";
import { ResultContext } from "../../contexts/resultContext";
import Table from "../common/Table/Table";
import BackButton from "../common/BackButton";
import "./Results.scss";

const Results = () => {
	const { publishResults } = useContext(ExamContext);
	const { results } = useContext(ResultContext);

	const query = queryString.parse(useLocation().search);

	const columns = [
		{
			label: "Student",
			path: "student.name",
		},
		{
			label: "Exam",
			condition: !query.exam,
			path: "exam.name",
		},
		{
			key: "view_answers",
			content: (result) => (
				<Link
					className="btn btn-outline-primary btn-small"
					to={`/results/${result._id}`}
				>
					View Answers
				</Link>
			),
		},
	];

	function populateData() {
		let data = results;
		const { exam, student, teacher } = query;
		if (exam) data = data.filter((d) => d.exam._id === exam);
		if (student) data = data.filter((d) => d.student._id === student);
		if (teacher) data = data.filter((d) => d.exam.author === teacher);
		return data;
	}

	return (
		<Fragment>
			<section className="actions">
				<BackButton className="btn btn-outline-primary action-item" />
				<button
					className="btn btn-primary action-item ml-auto"
					onClick={() => {}}
				>
					Calculate Marks
				</button>
				{isExamOnly(query) && (
					<button
						className="btn btn-success action-item"
						onClick={() => {
							publishResults(query.exam);
						}}
					>
						Publish Result
					</button>
				)}
			</section>
			<section className="content">
				<div className="content-item fl-1">
					<Table
						columns={columns}
						data={populateData()}
						serialNo="No"
						label="Results"
					/>
				</div>
			</section>
		</Fragment>
	);
};

function isExamOnly(obj) {
	const entries = Object.entries(obj);
	if (!entries.length) return false;
	return entries[0][0] === "exam" && entries.length === 1;
}

export default Results;
