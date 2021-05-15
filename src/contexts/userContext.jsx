import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";
import userService from "./../services/userService";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

const UserProvider = ({ children }) => {
	const user = authService.getCurrentUser();
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		async function run() {
			try {
				const { data } = await userService.getFriends();
				setFriends(data);
			} catch (error) {}
		}
		if (user) run();
	}, [user]);

	async function removeFriend(friend) {
		const originalFriends = [...friends];
		try {
			await userService.unEnroll(friend._id);
			toast.success(
				`${
					user.isTeacher
						? "Removed student"
						: "Unenrolled from teacher"
				} ${friend.name}`
			);
			setFriends([...friends].filter((e) => e._id !== friend._id));
		} catch (error) {
			setFriends(originalFriends);
			toast.error(
				`Error ${
					user.isTeacher
						? "Removing student"
						: "Unenrolling from teacher"
				} ${friend.name}`
			);
		}
	}

	return (
		<UserContext.Provider
			value={{
				user,
				friends,
				removeFriend,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
