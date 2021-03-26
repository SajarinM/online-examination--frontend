import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "users";

export async function register(user) {
	return http.post(apiEndpoint, {
		name: user.name,
		type: user.type === "Student" ? "student" : "teacher",
		username: user.email,
		password: user.password,
	});
}

const userService = {
	register,
};

export default userService;
