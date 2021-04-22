import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import examService from "../services/examService";
import date from "../utilities/date";
import { UserContext } from "./userContext";

export const ExamContext = createContext();
ExamContext.displayName = "ExamContext";

const ExamProvider = ({ children }) => {
	const [exams, setExams] = useState([]);
	const [loading, setLoading] = useState(true);
	const user = useContext(UserContext);

	useEffect(() => {
		async function getExams() {
			const { data: exams } = await examService.getExams();
			exams.forEach((exam) => {
				exam.startingTime = date.toDateObject(exam.startingTime);
				exam.dueTime = date.toDateObject(exam.dueTime);
			});
			setExams(exams);
			setLoading(false);
		}
		if (user) getExams();
	}, [user]);

	async function saveExam(exam) {
		try {
			const newExams = [...exams];
			const existingExam = exams.find((e) => e._id === exam._id);
			const { data } = await examService.saveExam(exam);
			if (existingExam) {
				newExams[exams.indexOf(existingExam)] = data;
				toast.success("Exam updated successfully");
			} else {
				newExams.push(data);
				toast.success("New exam created successfully");
			}
			setExams(newExams);
		} catch (error) {
			toast.error("Error saving examination.Please try again");
		}
	}

	async function deleteExam(id) {
		const originalExams = [...exams];
		try {
			setExams(exams.filter((e) => e._id !== id));
			await examService.deleteExam(id);
		} catch (error) {
			toast.error("Error deleting examination.Please try again...");
			setExams(originalExams);
		}
	}

	async function publishResults(id) {
		try {
			const { data: publishedExam } = await examService.publishResults(
				id
			);
			const newExams = [...exams];
			const existingExam = exams.find((e) => e._id === id);
			const index = exams.indexOf(existingExam);
			newExams[index] = publishedExam;
			setExams(newExams);
			toast.success("Results published successfully");
		} catch (error) {
			console.log(error);
			toast.error("Error publishing results.Please try again...");
		}
	}

	function getExam(id) {
		return exams.find((e) => e._id === id);
	}

	return (
		<ExamContext.Provider
			value={{
				exams,
				loading,
				saveExam,
				deleteExam,
				getExam,
				publishResults,
			}}
		>
			{children}
		</ExamContext.Provider>
	);
};

export default ExamProvider;
