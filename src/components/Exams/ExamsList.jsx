import React, { Fragment, useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { ExamContext } from "../../contexts/examContext";
import { ResultContext } from "../../contexts/resultContext";
import Card from "../common/Card/Card";
import "./Examslist.scss";
import { Link } from "react-router-dom";

const ExamsList = ({ mapToCardModel }) => {
	const user = useContext(UserContext);
	const examContext = useContext(ExamContext);
	const resultContext = useContext(ResultContext);

	return (
		<div className="card-container">
			{examContext.exams.map((exam) => (
				<Card
					key={exam._id}
					{...mapToCardModel({
						exam,
						examContext,
						user,
						resultContext,
					})}
				/>
			))}
		</div>
	);
};

export default ExamsList;
