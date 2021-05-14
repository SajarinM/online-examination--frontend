import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../contexts/userContext";
import { userService } from "../services/userService";
import Table from "./common/Table/Table";
import { toast } from "react-toastify";

const Friends = () => {
	const { isTeacher } = useContext(UserContext);
	const [friends, setFriends] = useState([]);

	useEffect(() => {
		async function run() {
			try {
				const { data } = await userService.getFriends();
				console.log(data);
				setFriends(data);
			} catch (error) {}
		}
		run();
	}, []);

	const columns = [
		{
			label: "Name",
			path: "name",
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
			condition: isTeacher,
			content: (item) => (
				<Link
					className="btn btn-primary btn-small"
					to={`/results?student=${item._id}`}
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
						const originalFriends = [...friends];
						try {
							await userService.unEnroll(item.username);
							toast.success(
								`${
									isTeacher
										? "Removed student"
										: "Unenrolled from teacher"
								} ${item.name}`
							);
							setFriends(
								[...friends].filter((e) => e._id !== item._id)
							);
						} catch (error) {
							setFriends(originalFriends);
						}
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
			<div className="bg-white br-4 fl-1">
				<Table
					className="bg-white br-4 fl-1"
					columns={columns}
					data={friends}
				/>
			</div>
		</section>
	);
};

export default Friends;
