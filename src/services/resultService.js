import http from "./httpService";

const apiEndpoint = "/exams/results";

function getResultUrl(id) {
	return `${apiEndpoint}/${id}`;
}

function getResults() {
	return http.get(apiEndpoint);
}

function editResult(resultId, body) {
	return http.put(getResultUrl(resultId), body);
}

// function saveResult(resultId) {}

const resultService = {
	getResults,
	editResult,
};

export default resultService;
