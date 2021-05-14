import { useEffect } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";

const Logout = () => {
	useEffect(() => {
		authService.logout();
		toast.success("Successfully Logged out");
		window.location = "/";
	}, []);
	return null;
};

export default Logout;
