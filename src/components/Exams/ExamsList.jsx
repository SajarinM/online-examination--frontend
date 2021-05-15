import React, { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { ExamContext } from "../../contexts/examContext";
import Card from "../common/Card/Card";
import "./Examslist.scss";
import date from "./../../utilities/date";
import Icon from "./../common/Icon/Icon";

const ExamsList = ({ exams }) => {
	const {
		user: { isTeacher },
	} = useContext(UserContext);
	const { deleteExam } = useContext(ExamContext);

	function mapToCardModel(exam) {
		const {
			_id,
			startingTime,
			dueTime,
			name,
			noOfQuestions,
			author,
			totalMarks,
		} = exam;

		const isOnTime =
			new Date(startingTime) <= new Date() &&
			new Date() <= new Date(dueTime);

		const card = {
			title: name,
			details: [
				`Start : ${date.toDisplay(startingTime)}`,
				`Due : ${date.toDisplay(dueTime)}`,
				`No Of Questions : ${noOfQuestions}`,
				`Total Marks : ${totalMarks}`,
				`Invigilator : ${author.name}`,
			],
			buttons: [
				{
					icon: isTeacher ? (
						<Icon name="edit-pencil" size="15" />
					) : null,
					text: `${isTeacher ? "" : "Start Now"}`,
					link: `/exams/${isTeacher ? _id : "write/" + _id}`,
					className: `btn-warning btn-round`,
					disabled: isTeacher ? false : !isOnTime,
				},
				{
					text: "Results",
					link: `/results/?exam=${_id}`,
					className: `btn-primary btn-round`,
				},
			],
			isHoverEnabled: isTeacher ? true : isOnTime,
		};

		if (isTeacher) {
			card.buttons.splice(1, 0, {
				icon: <Icon name="bin" size="18" />,
				link: `/exams`,
				disabled: isTeacher ? false : !isOnTime,
				className: "btn-danger btn-round",
				onClick: () => {
					deleteExam(_id);
				},
			});
			card.details.pop();
		} else if (!exam.isResultPublished) {
			card.buttons.pop();
		}

		return card;
	}

	return (
		<div className="card-container">
			{exams.map((exam) => (
				<Card key={exam._id} {...mapToCardModel(exam)} />
			))}
		</div>
	);
};

export default ExamsList;
