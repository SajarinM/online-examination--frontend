import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { ExamContext } from "../../contexts/examContext";
import Card from "../common/Card/Card";
import "./Examslist.scss";

const ExamsList = ({ mapToCardModel }) => {
	const user = useContext(UserContext);
	const examContext = useContext(ExamContext);

	return (
		<div className="card-container">
			{examContext.exams.map((exam) => (
				<Card
					key={exam._id}
					{...mapToCardModel({ exam, examContext, user })}
				/>
			))}
		</div>
	);
};

export default ExamsList;
