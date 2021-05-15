import React, { useContext } from "react";
import Table from "../common/Table/Table";
import { UserContext } from "../../contexts/userContext";
import { RequestContext } from "../../contexts/requestContext";
import { userTypes } from "../../services/authService";
import { toast } from "react-toastify";
import date from "../../utilities/date";

const RequestsTable = ({ selectedStatus }) => {
	const { user } = useContext(UserContext);
	const { requests, updateRequest } = useContext(RequestContext);

	const columns = [
		{
			label: "User Id",
			path: getUserIdPath(),
		},
		{
			key: "time",
			label: "Time",
			content: (request) => date.toDisplay(request.time),
		},
		{
			label: "Status",
			path: "status",
		},
		{
			key: "accepted",
			condition: user.type === userTypes.teacher,
			content: (request) =>
				request.status === "pending" && (
					<button
						value="accepted"
						className="btn btn-primary btn-small"
						onClick={(e) =>
							handleStatusUpdate(request, e.currentTarget.value)
						}
					>
						Accept
					</button>
				),
		},
		{
			key: "rejected",
			condition: user && user.type === userTypes.teacher,
			content: (request) =>
				request.status === "pending" && (
					<button
						value="rejected"
						className="btn btn-danger btn-small"
						onClick={(e) =>
							handleStatusUpdate(request, e.currentTarget.value)
						}
					>
						Reject
					</button>
				),
		},
	];

	const handleStatusUpdate = async (request, status) => {
		try {
			const message = await updateRequest(request, status);
			toast.success(message);
		} catch (error) {
			toast.error(error.message);
		}
	};

	function getUserIdPath() {
		if (user.type === userTypes.teacher) {
			return "studentUsername";
		} else if (user.type === userTypes.student) {
			return "teacherUsername";
		}
	}

	const getFiteredRequests = () => {
		return requests.filter((request) => {
			return selectedStatus.value
				? request.status === selectedStatus.value
				: true;
		});
	};

	const filteredRequests = getFiteredRequests();

	return (
		<Table columns={columns} data={filteredRequests} label={"Requests"} />
	);
};

export default RequestsTable;
