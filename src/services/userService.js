import http from "./httpService";

const apiEndpoint = "/users";

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

export function getTeachers() {
    return http.get(apiEndpoint + "/teachers");
}

export const userService = {
    register,
    getFriends,
    getTeachers,
    unEnroll,
};

export default userService;
