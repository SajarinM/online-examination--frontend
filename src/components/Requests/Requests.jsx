import React, { useContext, useState } from "react";
import RequestsTable from "./RequestsTable";
import ListGroup from "../common/ListGroup";
import { UserContext } from "./../../contexts/userContext";
import "./Requests.scss";
import SendRequest from "./SendRequest";

const Requests = () => {
	const user = useContext(UserContext);

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

	return (
		<div>
			{user.type === "student" && <SendRequest />}
			<section className="section-requests">
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
			</section>
		</div>
	);
};

export default Requests;
