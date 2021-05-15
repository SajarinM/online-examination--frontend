import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "users";

export function register(user) {
	return http.post(apiEndpoint, {
		name: user.name,
		type: user.type === "Student" ? "student" : "teacher",
		username: user.email,
		password: user.password,
	});
}

export function getFriends() {
	return http.get(apiEndpoint);
}

export function unEnroll(friendId) {
	return http.post(apiEndpoint + "/unenroll", { friendId });
}

export const userService = {
	register,
	getFriends,
	unEnroll,
};

export default userService;
