import React, { useContext } from "react";
import { UserContext } from "./../../contexts/userContext";
import profile from "../../assets/icons/profile.svg";
import "./Profile.scss";

const Profile = () => {
	const user = useContext(UserContext);

	return (
		<section className="profile">
			<div className="profile__left">
				<div className="profile__greet-box">
					<img src={profile} alt="profile" className="profile__img" />
					<div className="profile__greet">
						<p>Hello</p>
						<h2>{user.name}</h2>
					</div>
				</div>
				<ul className="profile__options">
					<li>change password</li>
				</ul>
			</div>
			<div className="profile__right">right</div>
		</section>
	);
};

export default Profile;
