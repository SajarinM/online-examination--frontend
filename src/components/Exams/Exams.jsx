import React, { useContext, useState } from "react";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { ExamContext } from "../../contexts/examContext";
import { UserContext } from "../../contexts/userContext";
import Icon from "./../common/Icon/Icon";
import Searchbox from "../common/Searchbox/Searchbox";
import ExamsList from "./ExamsList";
import queryString from "query-string";

const Exams = () => {
	const { user } = useContext(UserContext);
	const { exams } = useContext(ExamContext);
	const query = queryString.parse(useLocation().search);

	const [search, setSearch] = useState("");

	function populateExams() {
		let data = exams;
		const { teacher } = query;
		if (teacher) data = data.filter((e) => e.author._id === teacher);
		if (search)
			data = data.filter((e) =>
				e.name.toLowerCase().includes(search.toLowerCase())
			);
		return data;
	}

	return (
		<Fragment>
			<section className="actions">
				{user.type === "teacher" && (
					<Link
						to="/exams/new"
						className="btn btn-success btn-icon action-item"
					>
						<Icon
							name="add-outline"
							size="20"
							className="sidebar-nav__icon"
						/>
						<span>Create new Exam</span>
					</Link>
				)}
				<Searchbox
					value={search}
					setValue={setSearch}
					placeholder="Search exams..."
				/>
			</section>

			<section className="content">
				<ExamsList exams={populateExams()} />
			</section>
		</Fragment>
	);
};

export default Exams;
