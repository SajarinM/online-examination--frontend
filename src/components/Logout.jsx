import { Component } from "react";
import { toast } from "react-toastify";
import authService from "../services/authService";

class Logout extends Component {
	componentDidMount() {
		authService.logout();
		toast.success("Successfully Logged out");
		window.location = "/";
	}

	render() {
		return null;
	}
}

export default Logout;
