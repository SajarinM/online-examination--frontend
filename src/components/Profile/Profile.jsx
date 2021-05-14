import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../../contexts/userContext";
import { ExamContext } from "./../../contexts/examContext";
import { ResultContext } from "./../../contexts/resultContext";
import { RequestContext } from "./../../contexts/requestContext";
import Icon from "./../common/Icon/Icon";
import profile from "../../assets/icons/profile.svg";
import "./Profile.scss";

const Profile = () => {
	const user = useContext(UserContext);
	const { exams } = useContext(ExamContext);
	const { results } = useContext(ResultContext);
	const { requests } = useContext(RequestContext);

	const cards = [
		{
			bg: "bg-primary",
			smallText: "exams",
			lgText: exams.length,
			link: { text: "view exams", to: "/exams" },
			icon: { name: "files-empty" },
		},
		{
			bg: "bg-success",
			smallText: "students",
			lgText: user.friends.length,
			link: { text: "manage students", to: "/students" },
			icon: { name: "user-group" },
			condition: user.isTeacher,
		},
		{
			bg: "bg-success",
			smallText: "teachers",
			lgText: user.friends.length,
			link: { text: "manage teachers", to: "/teachers" },
			icon: { name: "group" },
			condition: !user.isTeacher,
		},
		{
			bg: "bg-secondary",
			smallText: "pending requests",
			lgText: requests.filter((r) => r.status === "pending").length,
			link: { text: "view requests", to: "/requests?status=pending" },
			icon: { name: "envelope" },
			condition: user.isTeacher,
		},

		{
			bg: "bg-danger",
			smallText: "results",
			lgText: results.length,
			link: { text: "view results", to: "/results" },
			icon: { name: "group" },
		},
	];

	return (
		<section className="profile">
			<section className="actions">
				<img src={profile} alt="profile" className="profile__img" />
				<div className="profile__greet">
					<p>Hello</p>
					<h2>{user.name}</h2>
				</div>
				<button className="btn btn-outline-primary action-item ml-auto">
					Change password
				</button>
			</section>
			<section className="content d-flex-c">
				<div className="profile__cards">
					{cards.map((c) =>
						c.condition === false ? null : <DashCard {...c} />
					)}
				</div>
				<div className="profile__details bg-white br-4 fl-1"></div>
			</section>
		</section>
	);
};

const DashCard = ({ smallText, lgText, link, icon, bg }) => {
	return (
		<div className={`profile__card ${bg}`}>
			<div className="profile__card-body">
				<div>
					<p className="text-lg">{lgText}</p>
					<p className="text-small">{smallText}</p>
				</div>
				<Icon {...icon} />
			</div>
			<Link className="profile__card-footer link" to={link.to}>
				<p>{link.text}</p>
				<Icon name="cheveron-right" />
			</Link>
		</div>
	);
};

export default Profile;
