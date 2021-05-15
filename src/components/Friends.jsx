import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../contexts/userContext";
import { ExamContext } from "./../contexts/examContext";
import Table from "./common/Table/Table";

const Friends = () => {
	const {
		user: { isTeacher },
		friends,
		removeFriend,
	} = useContext(UserContext);
	const { exams } = useContext(ExamContext);

	const columns = [
		{
			label: "Name",
			path: "name",
		},
		{
			label: "No of exams",
			condition: !isTeacher,
			key: "No of exams",
			content: (item) =>
				exams.filter((e) => e.author._id === item._id).length,
		},
		{
			label: "Results Published",
			condition: !isTeacher,
			key: "No of results",
			content: (item) => exams.filter((e) => e.isResultPublished).length,
		},
		{
			label: "Exams Attended",
			condition: isTeacher,
			key: "No of exams attended",
			content: (item) =>
				exams.filter((e) => e.participants.includes(item._id)).length,
		},
		{
			key: "view exams",
			condition: !isTeacher,
			content: (item) => (
				<Link
					className="btn btn-primary btn-small"
					to={`/exams?teacher=${item._id}`}
				>
					View exams
				</Link>
			),
		},
		{
			key: "view results",
			content: (item) => (
				<Link
					className="btn btn-primary btn-small"
					to={`/results?${isTeacher ? "student" : "teacher"}=${
						item._id
					}`}
				>
					View results
				</Link>
			),
		},
		{
			key: "unenroll",
			content: (item) => (
				<button
					onClick={async () => {
						removeFriend(item);
					}}
					className="btn btn-danger btn-small"
				>
					{isTeacher ? "Remove" : "Unenroll"}
				</button>
			),
		},
	];
	return (
		<section className="content mh-100 d-flex-c">
			<div className="content-item fl-1">
				<Table columns={columns} data={friends} serialNo />
			</div>
		</section>
	);
};

export default Friends;
