import date from "./date";

function allExamsMap({ exam, examContext, user }) {
	const isTeacher = user.type === "teacher";
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
		new Date(startingTime) <= new Date() && new Date() <= new Date(dueTime);

	const card = {
		title: name,
		details: [
			`Start : ${date.toDisplay(startingTime)}`,
			`Due : ${date.toDisplay(dueTime)}`,
			`No Of Questions : ${noOfQuestions}`,
			`Invigilator : ${author.name}`,
			`Total Marks : ${totalMarks}`,
		],
		buttons: [
			{
				text: `${isTeacher ? "Edit" : "Start Now"}`,
				link: `/exams/${isTeacher ? _id : "write/" + _id}`,
				disabled: isTeacher ? false : !isOnTime,
			},
			{
				text: `view result`,
				link: `/exams/results/${_id}`,
			},
		],
		isHoverEnabled: isTeacher ? true : isOnTime,
	};

	if (isTeacher) {
		card.buttons.push({
			text: `Delete`,
			link: `/exams/all`,
			disabled: isTeacher ? false : !isOnTime,
			onClick: () => {
				examContext.deleteExam(_id);
			},
		});
	} else if (!exam.isResultPublished) {
		card.buttons.pop();
	}

	return card;
}

function resultsMap({ exam, user }) {
	const isTeacher = user.type === "teacher";
	const { _id: examID, name, noOfQuestions, totalMarks, participants } = exam;

	const card = {
		title: name,
		details: [
			`No Of Questions : ${noOfQuestions}`,
			`Total Marks : ${totalMarks}`,
		],
		buttons: [
			{
				text: `view result`,
				link: `/exams/results/${examID}`,
			},
		],
		isHoverEnabled: true,
	};

	if (isTeacher) card.details.push(`Attendace : ${participants.length}`);

	return card;
}

const cardMaps = {
	allExamsMap,
	resultsMap,
};

export default cardMaps;
