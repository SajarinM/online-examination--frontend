import React, { createContext } from "react";
import authService from "../services/authService";

export const UserContext = createContext();
UserContext.displayName = "UserContext";

const UserProvider = ({ children }) => {
	return (
		<UserContext.Provider value={authService.getCurrentUser()}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
