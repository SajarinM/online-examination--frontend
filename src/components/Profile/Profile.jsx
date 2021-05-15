import React, { createRef, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import { UserContext } from "./../../contexts/userContext";
import { ExamContext } from "./../../contexts/examContext";
import { ResultContext } from "./../../contexts/resultContext";
import { RequestContext } from "./../../contexts/requestContext";
import Icon from "./../common/Icon/Icon";
import Popup from "./../common/Popup/Popup";
import useForm from "./../common/Form/useForm";
import authService from "./../../services/authService";
import "./Profile.scss";

const Profile = () => {
	const { user, friends } = useContext(UserContext);
	const { exams } = useContext(ExamContext);
	const { results } = useContext(ResultContext);
	const { requests } = useContext(RequestContext);

	const popup = createRef();
	const [data, setData] = useState({ current: "", new: "" });
	const [errors, setErrors] = useState({});

	const { renderTextInput, renderSubmitButton, handleSubmit } = useForm({
		data,
		setData,
		errors,
		setErrors,
		schema: {
			current: Joi.string()
				.min(5)
				.max(255)
				.required()
				.label("Current password"),
			new: Joi.string().min(5).max(255).required().label("New password"),
		},
		doSubmit: async () => {
			try {
				await authService.changePassword({
					currentPassword: data.current,
					newPassword: data.new,
				});
				toast.success("Password changed successfully");
			} catch (error) {
				if (error.response && error.response.status === 400)
					toast.error(error.response.data);
				else toast.error("Error changing password");
			}
		},
	});

	const cards = [
		{
			bg: "bg-primary",
			smallText: "exams",
			lgText: exams.length,
			link: { text: "view exams", to: "/exams" },
			icon: { name: "document-edit" },
		},
		{
			bg: "bg-success",
			smallText: "students",
			lgText: friends.length,
			link: { text: "manage students", to: "/students" },
			icon: { name: "graduation-cap" },
			condition: user.isTeacher,
		},
		{
			bg: "bg-success",
			smallText: "teachers",
			lgText: friends.length,
			link: { text: "manage teachers", to: "/teachers" },
			icon: { name: "group" },
			condition: !user.isTeacher,
		},
		{
			bg: "bg-secondary",
			smallText: "pending requests",
			lgText: requests.filter((r) => r.status === "pending").length,
			link: { text: "view requests", to: "/requests?status=pending" },
			icon: { name: "bubble" },
			condition: user.isTeacher,
		},

		{
			bg: "bg-danger",
			smallText: "results",
			lgText: results.length,
			link: { text: "view results", to: "/results" },
			icon: { name: "line-chart" },
		},
	];

	return (
		<section className="profile">
			<section className="actions">
				{/* <img src={profile} alt="profile" className="profile__img" /> */}
				<div className="profile__greet">
					<p>Hello</p>
					<h2>{user.name}</h2>
				</div>
				<button
					onClick={() => {
						popup.current.show();
					}}
					className="btn btn-outline-primary action-item ml-auto"
				>
					Change password
				</button>
			</section>
			<section className="content d-flex-c">
				<div className="profile__cards">
					{cards.map((c) =>
						c.condition === false ? null : <DashCard {...c} />
					)}
				</div>
				<div className="content-item profile__details fl-1">
					<h1 className="bg-primary">about</h1>
					<ul>
						<li>
							<p>name</p>
							<p>: {user.name}</p>
						</li>
						<li>
							<p>type</p>
							<p>: {user.type}</p>
						</li>
						<li>
							<p>username</p>
							<p>: {user.username}</p>
						</li>
					</ul>
				</div>
			</section>
			<Popup ref={popup}>
				<form onSubmit={handleSubmit}>
					{renderTextInput({
						name: "current",
						label: "Current Password",
					})}
					{renderTextInput({
						name: "new",
						label: "New Password",
					})}
					{renderSubmitButton({})}
				</form>
			</Popup>
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
