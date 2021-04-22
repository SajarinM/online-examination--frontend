import React, {
	createRef,
	Fragment,
	useContext,
	useEffect,
	useState,
} from "react";
import { useParams } from "react-router";
import { ExamContext } from "../../contexts/examContext";
import useForm from "../common/Form/useForm";
import Popup from "../common/Popup/Popup";
import Table from "../common/Table/Table";
import QuestionForm from "../QuestionForm/QuestionForm";
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
	const questionPopup = createRef();

	const {
		handleSubmit,
		renderTextInput,
		renderSubmitButton,
		renderResetButton,
	} = useForm({
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
					className="btn btn--green"
					onClick={() => {
						setSelectedQuestion(question);
						questionPopup.current.show();
					}}
				>
					edit
				</div>
			),
			key: "edit",
		},
		{
			label: "",
			content: (question) => (
				<div
					className="btn btn--red"
					onClick={() => {
						const filterdQuestions = questions.filter(
							(q) => q._id !== question._id
						);
						setQuestions(filterdQuestions);
					}}
				>
					delete
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
		saveExam({
			...data,
			questions,
		});
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
		<Fragment>
			<form className="form" onSubmit={handleSubmit}>
				{renderTextInput({
					name: "name",
					label: "Exam Name",
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
					className="btn btn--green"
					onClick={() => {
						questionPopup.current && questionPopup.current.show();
						setSelectedQuestion(null);
					}}
				>
					add question
				</div>
				{questions.length > 0 && (
					<Table columns={columns} data={questions} />
				)}

				<div className="form__button-group">
					{renderSubmitButton("Submit", "btn btn--green")}
					{renderResetButton("Reset", "btn btn--green")}
				</div>
			</form>
			<Popup ref={questionPopup}>
				<QuestionForm
					selectedQuestion={selectedQuestion}
					addQuestion={handleAddQuestion}
				/>
			</Popup>
		</Fragment>
	);
};

export default ExamForm;
