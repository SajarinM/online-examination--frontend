import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
	const { data: jwt } = await http.post(apiEndpoint, { username, password });
	localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
	localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
	try {
		const jwt = localStorage.getItem(tokenKey);
		return jwtDecode(jwt);
	} catch (error) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(tokenKey);
}

export function logout() {
	localStorage.removeItem(tokenKey);
}

export function changePassword(data) {
	return http.put(apiEndpoint, data);
}

export const userTypes = {
	student: "student",
	teacher: "teacher",
};

const authService = {
	login,
	logout,
	getCurrentUser,
	loginWithJwt,
	getJwt,
	changePassword,
	userTypes,
};
export default authService;
