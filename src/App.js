import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm";
// import Teachers from "./components/Teachers";
import Exams from "./components/Exams/Exams";
import Logout from "./components/Logout";
import UserProvider from "./contexts/userContext";
import ExamProvider from "./contexts/examContext";
// import Students from "./components/MyProfile";
import QuestionPaper from "./components/QuestionPaper/QuestionPaper";
import "react-toastify/dist/ReactToastify.css";
// import Profile from "./components/Profile/Profile";
import MyProfile from "./components/MyProfile";

const App = () => {
	return (
		<UserProvider>
			<ExamProvider>
				<ToastContainer position="bottom-right" />
				<div className="content">
					<Navbar />
					<Switch>
						{/* <Route path="/students" component={Students} />
							<Route path="/teachers" component={Teachers} /> */}
						<Route
							exact
							path="/exams/write/:id"
							component={QuestionPaper}
						/>
						<Route path="/exams" component={Exams} />
						<Route path="/login" component={LoginForm} />
						<Route path="/logout" component={Logout} />
						<Route path="/signup" component={SignupForm} />
						<Route path="/account" component={MyProfile} />
						<Redirect exact from="/" to="/login" />
					</Switch>
				</div>
			</ExamProvider>
		</UserProvider>
	);
};

export default App;
