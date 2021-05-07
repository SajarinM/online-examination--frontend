import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DropdownList } from "react-widgets";
import { toast } from "react-toastify";
import Fullscreen from "react-fullscreen-crossbrowser";
import examService from "./../../services/examService";
import Icon from "../common/Icon/Icon";
import "./QuestionPaper.scss";

const QuestionPaper = () => {
	const { id: examId } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [isFullscreen, setisFullscreen] = useState(false);

	useEffect(() => {
		async function poulateQuestionPaper() {
			try {
				let {
					data: { questions: newQuestions, answers: newAnswers },
				} = await examService.getExamData(examId);
				if (newAnswers.length === 0)
					newAnswers = newQuestions.map((q) => "");
				setQuestions(newQuestions);
				setAnswers(newAnswers);
				setIsLoading(false);
			} catch (error) {
				if (error.response && error.response.status === 400) {
					alert(error.response.data);
				}
			}
		}
		poulateQuestionPaper();
	}, [examId]);

	function handleAnswerChange(valueonselect) {
		const newAnswers = [...answers];
		newAnswers[currentQuestion] = valueonselect;
		setAnswers(newAnswers);
	}

	function handleQuestionChange(question) {
		setCurrentQuestion(questions.indexOf(question));
	}

	async function saveAnswers() {
		try {
			const { data } = await examService.saveAnswers(examId, answers);
			toast.success("Successfully saved current data...", {
				autoClose: 3000,
			});
			return data;
		} catch (error) {
			toast.error("Error saving data. Try again...", {
				autoClose: 3000,
			});
		}
	}

	if (isLoading) return null;

	const { label, type, options } = questions[currentQuestion];

	return (
		<Fullscreen enabled={isFullscreen}>
			<section className="question-container u-prevent-copy">
				<nav className="question-container__nav-top">
					<div className="question__nav-item question__info">
						{`${currentQuestion + 1} / ${questions.length}`}
					</div>

					<button
						title="Save current state"
						className="question__nav-item question__nav-item--save"
						onClick={() => {
							saveAnswers();
						}}
					>
						<Icon name="save" color="#FFFFFF" />
					</button>

					<button
						title="Submit"
						className="question__nav-item question__nav-item--submit"
						onClick={() => {}}
					>
						submit
					</button>

					<DropdownList
						data={questions}
						defaultValue={questions[0]}
						textField={(item) => `${item._id}. ${item.label}`}
						valueField={(item) => questions.indexOf(item)}
						onChange={handleQuestionChange}
						className="question__nav-item question__select"
					/>

					<button
						title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
						className="question__nav-item question__nav-item--save"
						onClick={() => {
							setisFullscreen(!isFullscreen);
						}}
					>
						<Icon
							name={
								isFullscreen ? "fullscreen_exit" : "fullscreen"
							}
							color="#FFFFFF"
						/>
					</button>
				</nav>

				<div className="question">
					<h1 className="question__label">{label}</h1>

					{type === "optional" && (
						<ul className="question__options">
							{options.map((option, index) => {
								return (
									<li
										key={option}
										className={`question__option question__option--${
											index + 1
										} ${
											answers[currentQuestion] === option
												? "question__option--selected"
												: ""
										}`}
										onClick={(e) =>
											handleAnswerChange(option)
										}
									>
										<div className="question__option-tag">
											<h3>{index + 1}</h3>
										</div>
										<p>{option}</p>
									</li>
								);
							})}
						</ul>
					)}
					{type === "custom" && (
						<div className="u-flex-center u-w-100">
							<textarea
								className="question__text-box"
								name={currentQuestion}
								value={answers[currentQuestion]}
								onPaste={(e) => e.preventDefault()}
								onCopy={(e) => e.preventDefault()}
								onChange={(e) =>
									handleAnswerChange(e.currentTarget.value)
								}
							></textarea>
						</div>
					)}
				</div>

				<nav className="question-container__nav-bottom">
					{currentQuestion !== 0 && (
						<button
							title="Previous Question"
							className="question__nav-item question__nav-item--previous"
							onClick={() =>
								setCurrentQuestion(currentQuestion - 1)
							}
						>
							<Icon name="arrow-bold-left" color="#FFFFFF" />
						</button>
					)}
					{questions.length > currentQuestion + 1 && (
						<button
							title="Next Question"
							className="question__nav-item question__nav-item--next"
							onClick={() =>
								setCurrentQuestion(currentQuestion + 1)
							}
						>
							<Icon name="arrow-bold-right" color="#FFFFFF" />
						</button>
					)}
				</nav>
			</section>
		</Fullscreen>
	);
};

export default QuestionPaper;
