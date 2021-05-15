import React, { createRef, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { ExamContext } from "../../contexts/examContext";
import Icon from "../common/Icon/Icon";
import Table from "../common/Table/Table";
import Popup from "../common/Popup/Popup";
import useForm from "../common/Form/useForm";
import BackButton from "./../common/BackButton";
import QuestionForm from "../QuestionForm";
import date from "./../../utilities/date";

const initialData = {
	name: "",
	startingTime: date.toLocaleString(date.getCurrentTime()),
	dueTime: date.toLocaleString(date.addHour(2, date.getCurrentTime())),
};

const ExamForm = () => {
	const { exams, saveExam, getExam } = useContext(ExamContext);

	const [data, setData] = useState(initialData);
	const [errors, setErrors] = useState({});
	const [questions, setQuestions] = useState([]);
	const [selectedQuestion, setSelectedQuestion] = useState(null);

	const { id } = useParams();
	const history = useHistory();
	const questionPopup = createRef();

	const { handleSubmit, renderTextInput, renderSubmitButton } = useForm({
		data,
		setData,
		errors,
		setErrors,
		initialData,
		doSubmit,
		requiresValidation: false,
	});

	const columns = [
		{
			label: "Question",
			path: "label",
		},
		{
			label: "Type",
			path: "type",
		},
		{
			label: "Marks",
			path: "mark",
		},
		{
			label: "",
			content: (question) => (
				<div
					className="btn btn-warning btn-small btn-round"
					onClick={() => {
						setSelectedQuestion(question);
						questionPopup.current.show();
					}}
				>
					<Icon name="edit-pencil" size="15" />
				</div>
			),
			key: "edit",
		},
		{
			label: "",
			content: (question) => (
				<div
					className="btn btn-danger btn-small btn-round"
					onClick={() => {
						const filterdQuestions = questions.filter(
							(q) => q._id !== question._id
						);
						setQuestions(filterdQuestions);
					}}
				>
					<Icon name="bin" size="17" />
				</div>
			),
			key: "delete",
		},
	];

	useEffect(() => {
		function populateExam() {
			if (id === "new") {
				setData(initialData);
				setErrors({});
				setQuestions([]);
				setSelectedQuestion(null);
				return;
			}

			const exam = getExam(id);
			if (!exam) return;
			const { name, startingTime, dueTime, questions } = exam;
			setData({
				_id: id,
				name,
				startingTime: date.toLocaleString(new Date(startingTime)),
				dueTime: date.toLocaleString(new Date(dueTime)),
			});
			setQuestions(questions);
		}
		populateExam();
	}, [exams, id, getExam]);

	function doSubmit() {
		if (!data.name)
			return setErrors({ name: "name is not allowed to be empty" });
		if (!questions.length)
			return setErrors({ name: "Exam must have atleast one question" });
		saveExam({
			...data,
			questions,
		});
		history.goBack();
	}

	function handleAddQuestion(question) {
		const newQuestions = [...questions];
		if (question._id) {
			const item = newQuestions.find((item) => item._id === question._id);
			const index = newQuestions.indexOf(item);
			newQuestions[index] = question;
		} else {
			if (newQuestions.length === 0) question._id = 1;
			else question._id = newQuestions[newQuestions.length - 1]._id + 1;
			newQuestions.push(question);
		}
		setQuestions(newQuestions);
		questionPopup.current.close();
	}

	return (
		<div className="p-rel">
			<form className="form" onSubmit={handleSubmit}>
				<section className="actions">
					<BackButton className="btn btn-outline-primary action-item" />
					{renderSubmitButton({
						className: "btn btn-success action-item ml-auto",
						render: <Icon name="check" size="20" />,
					})}
				</section>
				<section className="content d-flex-c">
					<div className="exam-form fl-1">
						{renderTextInput({
							name: "name",
							label: "Name",
							autoFocus: true,
						})}
						{renderTextInput({
							name: "startingTime",
							label: "Starting Time",
							type: "datetime-local",
						})}
						{renderTextInput({
							name: "dueTime",
							label: "Due Time",
							type: "datetime-local",
							min: data.startingTime,
						})}
						<div
							className="btn btn-outline-success btn-icon mb-2"
							onClick={() => {
								questionPopup.current &&
									questionPopup.current.show();
								setSelectedQuestion(null);
							}}
						>
							<Icon name="add-outline" size="20" />
							<span>Add question</span>
						</div>
						{questions.length > 0 && (
							<Table columns={columns} data={questions} />
						)}
					</div>
				</section>
			</form>
			<Popup ref={questionPopup}>
				<QuestionForm
					selectedQuestion={selectedQuestion}
					addQuestion={handleAddQuestion}
				/>
			</Popup>
		</div>
	);
};

export default ExamForm;
