import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import queryString from "query-string";
import { UserContext } from "./../../contexts/userContext";
import ListGroup from "../common/ListGroup";
import SendRequest from "./SendRequest";
import RequestsTable from "./RequestsTable";
import "./Requests.scss";

const navItems = [
	{
		label: "All",
	},
	{
		label: "Pending",
		value: "pending",
	},
	{
		label: "Accepted",
		value: "accepted",
	},
	{
		label: "Rejected",
		value: "rejected",
	},
];

const Requests = () => {
	const {
		user: { isTeacher },
	} = useContext(UserContext);
	const { status } = queryString.parse(useLocation().search);

	const [selectedStatus, setSelectedStatus] = useState(navItems[0]);

	useEffect(() => {
		if (status)
			setSelectedStatus(
				navItems.find((i) => i.value === status) || navItems[0]
			);
	}, [status]);

	return (
		<>
			{!isTeacher && (
				<section className="actions">
					<SendRequest />
				</section>
			)}
			<section
				className={`content d-flex-c ${isTeacher ? "mh-100" : ""}`}
			>
				<div className="content-item fl-1">
					<ListGroup
						items={navItems}
						selectedItem={selectedStatus}
						onItemSelect={(status) => setSelectedStatus(status)}
						containerClassName="navigation-sub"
						itemClassName="navigation-sub__item"
						itemActiveClassName="navigation-sub__item--active"
						keyProperty="label"
					/>
					<RequestsTable selectedStatus={selectedStatus} />
				</div>
			</section>
		</>
	);
};

export default Requests;
