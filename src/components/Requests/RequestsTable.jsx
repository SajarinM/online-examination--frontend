import React, { useContext } from "react";
import Table from "../common/Table/Table";
import { UserContext } from "../../contexts/userContext";
import { RequestContext } from "../../contexts/requestContext";
import { userTypes } from "../../services/authService";
import { toast } from "react-toastify";
import date from "../../utilities/date";

const RequestsTable = ({ selectedStatus }) => {
	const user = useContext(UserContext);
	const { requests, updateRequest } = useContext(RequestContext);

	const columns = [
		{
			label: "User Id",
			path: getIdPath(),
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
			render: user.type === userTypes.teacher,
			content: (request) =>
				request.status === "pending" && (
					<button
						value="accepted"
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
			render: user && user.type === userTypes.teacher,
			content: (request) =>
				request.status === "pending" && (
					<button
						value="rejected"
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

	function getIdPath() {
		if (user.type === userTypes.teacher) {
			return "studentUsername";
		} else if (user.type === userTypes.student) {
			return "teacherUsername";
		}
	}

	const getFiteredRequests = () => {
		const filteredRequests = requests.filter((request) => {
			return selectedStatus.value
				? request.status === selectedStatus.value
				: true;
		});
		return { filteredRequests, count: filteredRequests.length };
	};

	const { filteredRequests, count } = getFiteredRequests();

	return (
		<React.Fragment>
			{count !== 0 && <Table columns={columns} data={filteredRequests} />}
			{count === 0 && (
				<center>
					<p>No requests found</p>
				</center>
			)}
		</React.Fragment>
	);
};

export default RequestsTable;
