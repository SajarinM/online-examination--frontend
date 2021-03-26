import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { ExamContext } from "../../contexts/examContext";
import { ResultContext } from "../../contexts/resultContext";
import Table from "../common/Table/Table";
import "./Results.scss";

const Results = () => {
	const { getExam } = useContext(ExamContext);
	const { results, setExamId } = useContext(ResultContext);

	const [exam, setExam] = useState({});

	const { id: examId } = useParams();
	const { pathname } = useLocation();

	useEffect(() => {
		setExamId(examId);
		setExam(getExam(examId));
		console.log(results);
	}, [results, examId, getExam, setExamId]);

	const columns = [
		{
			label: "Student",
			path: "student.name",
		},
		{
			key: "view_answers",
			content: (result) => (
				<Link to={`${pathname}/${result._id}`}>View Answers</Link>
			),
		},
	];

	return (
		<section className="section-content">
			<Table columns={columns} data={results} serialNo="No" />
		</section>
	);
};

export default Results;
