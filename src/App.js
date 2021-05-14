import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm";
import Exams from "./components/Exams/Exams";
import Logout from "./components/Logout";
import UserProvider from "./contexts/userContext";
import ExamProvider from "./contexts/examContext";
import ResultProvider from "./contexts/resultContext";
import RequestProvider from "./contexts/requestContext";
import QuestionPaper from "./components/QuestionPaper/QuestionPaper";
import Profile from "./components/Profile/Profile";
import Sidebar from "./components/common/Sidebar/Sidebar";
import ExamForm from "./components/ExamForm/ExamForm";
import Requests from "./components/Requests/Requests";
import Results from "./components/Results/Results";
import Answers from "./components/Results/Answers";
import Friends from "./components/Friends";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
	return (
		<UserProvider>
			<ExamProvider>
				<ResultProvider>
					<RequestProvider>
						<ToastContainer position="bottom-right" />
						<div className="container">
							<Sidebar />
							<main>
								<Switch>
									<Route
										exact
										path="/exams/write/:id"
										component={QuestionPaper}
									/>
									<Route
										path="/results/:resultId"
										component={Answers}
									/>
									<Route
										path="/results"
										component={Results}
									/>
									<Route
										path="/exams/:id"
										component={ExamForm}
									/>
									<Route path="/exams" component={Exams} />
									<Route
										path="/requests"
										component={Requests}
									/>
									<Route
										path="/login"
										component={LoginForm}
									/>
									<Route path="/logout" component={Logout} />
									<Route
										path="/signup"
										component={SignupForm}
									/>
									<Route
										path="/profile"
										component={Profile}
									/>
									<Route
										path="/teachers"
										component={Friends}
									/>
									<Route
										path="/students"
										component={Friends}
									/>
									<Redirect exact from="/" to="/login" />
								</Switch>
							</main>
						</div>
					</RequestProvider>
				</ResultProvider>
			</ExamProvider>
		</UserProvider>
	);
};

export default App;
