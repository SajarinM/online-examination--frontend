import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "exams";

function getExamUrl(id) {
	return `${apiEndpoint}/${id}`;
}

function saveExam(exam) {
	const { _id } = exam;
	if (_id) {
		return http.put(getExamUrl(_id), exam);
	}
	return http.post(apiEndpoint, exam);
}

function getExams() {
	return http.get(apiEndpoint);
}

function deleteExam(examId) {
	return http.delete(getExamUrl(examId));
}

function getQuestions(examId) {
	return http.get(getExamUrl(examId));
}

function saveAnswers(examId, answers) {
	return http.post(getExamUrl(examId), { answers, action: "save" });
}

function getAnswers(examId) {
	return http.post(getExamUrl(examId), { action: "start" });
}

function publishResults(id) {
	return http.post(getExamUrl(id), { action: "publish" });
}

const examService = {
	saveExam,
	getExams,
	deleteExam,
	getQuestions,
	getAnswers,
	saveAnswers,
	publishResults,
};

export default examService;
