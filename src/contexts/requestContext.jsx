import React, { createContext, useContext, useEffect, useState } from "react";
import requestService from "../services/requestService";
import db from "../utilities/db";
import { UserContext } from "./userContext";

export const RequestContext = createContext();
RequestContext.displayName = "RequestContext";

const RequestProvider = ({ children }) => {
	const [requests, setRequests] = useState([]);
	const user = useContext(UserContext);

	useEffect(() => {
		async function getRequests() {
			const { data: requests } = await requestService.getRequests();
			requests.forEach((request, i) => {
				request.no = i + 1;
				request.time = db.getTimeFromId(request._id);
			});
			setRequests(requests);
		}
		if (user) getRequests();
	}, [user]);

	const addRequest = async (teacher, student) => {
		const { data: request } = await requestService.sendRequest(
			teacher,
			student
		);
		setRequests([request, requests]);
	};

	const updateRequest = async (request, status) => {
		const originalRequests = [...requests];
		const updatedRequests = [...requests];
		const index = updatedRequests.indexOf(request);
		updatedRequests[index] = { ...updatedRequests[index] };
		updatedRequests[index].status = status;
		setRequests(updatedRequests);

		try {
			await requestService.updateRequest(request, status);
		} catch (error) {
			setRequests(originalRequests);
			throw new Error("Error while updating request");
		}
	};

	return (
		<RequestContext.Provider
			value={{ requests, addRequest, updateRequest }}
		>
			{children}
		</RequestContext.Provider>
	);
};

export default RequestProvider;
