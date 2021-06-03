import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import ProtectedRoute from "./components/common/ProtectedRoute";
import LoginForm from "./components/LoginForm";
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
import ExamForm from "./components/Exams/ExamForm";
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
                        {toast.configure({ position: "bottom-right" })}

                        <div className="container">
                            <Sidebar />
                            <main>
                                <Switch>
                                    <ProtectedRoute
                                        exact
                                        path="/exams/write/:id"
                                        component={QuestionPaper}
                                    />
                                    <ProtectedRoute
                                        path="/results/:resultId"
                                        component={Answers}
                                    />
                                    <ProtectedRoute
                                        path="/results"
                                        component={Results}
                                    />
                                    <ProtectedRoute
                                        path="/exams/:id"
                                        component={ExamForm}
                                    />
                                    <ProtectedRoute
                                        path="/exams"
                                        component={Exams}
                                    />
                                    <ProtectedRoute
                                        path="/requests"
                                        component={Requests}
                                    />
                                    <Route
                                        path="/login"
                                        component={LoginForm}
                                    />
                                    <ProtectedRoute
                                        path="/logout"
                                        component={Logout}
                                    />
                                    <Route
                                        path="/signup"
                                        component={SignupForm}
                                    />
                                    <ProtectedRoute
                                        path="/profile"
                                        component={Profile}
                                    />
                                    <ProtectedRoute
                                        path="/teachers"
                                        component={Friends}
                                    />
                                    <ProtectedRoute
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
