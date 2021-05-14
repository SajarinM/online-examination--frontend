import React, { useContext, useEffect, useState } from "react";
import RequestsTable from "./RequestsTable";
import ListGroup from "../common/ListGroup";
import { UserContext } from "./../../contexts/userContext";
import SendRequest from "./SendRequest";
import "./Requests.scss";
import { useLocation } from "react-router";
import queryString from "query-string";

const Requests = () => {
	const user = useContext(UserContext);
	const query = queryString.parse(useLocation().search);

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

	const [selectedStatus, setSelectedStatus] = useState(navItems[0]);

	useEffect(() => {
		if (query.status) setSelectedStatus(navItems[1]);
	}, []);

	return (
		<>
			<section className="actions">
				{user.type === "student" && <SendRequest />}
			</section>
			<section className="content d-flex-c">
				<div className="bg-white br-4 fl-1">
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
