import http from "./httpService";

const apiEndpoint = "/requests";

function getRequestUrl(id) {
	return `${apiEndpoint}/${id}`;
}

async function sendRequest(teacher, student) {
	return http.post(apiEndpoint, {
		studentUsername: student,
		teacherUsername: teacher,
	});
}

function getRequests() {
	return http.get(apiEndpoint);
}

function updateRequest(request, status) {
	return http.put(getRequestUrl(request._id), { status });
}

const requestService = {
	sendRequest,
	getRequests,
	updateRequest,
};

export default requestService;
