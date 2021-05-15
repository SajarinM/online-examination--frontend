import React, { Fragment, useContext, useEffect, useState } from "react";
import Table from "../common/Table/Table";
import { useParams } from "react-router";
import { UserContext } from "../../contexts/userContext";
import { ResultContext } from "../../contexts/resultContext";
import TextButton from "../common/TextButton/TextButton";
import BackButton from "../common/BackButton";

const Answers = () => {
	const {
		user: { isTeacher },
	} = useContext(UserContext);
	const { getResult, editResult } = useContext(ResultContext);

	const [data, setData] = useState([]);

	const { resultId } = useParams();

	useEffect(() => {
		const result = getResult(resultId);
		if (!result) return;

		const tableData = [...result.exam.questions];
		tableData.forEach((data, index) => {
			data.answerWritten = result.answers[index];
			data.marksGiven = result.marksObtained[index];
		});
		setData(tableData);
	}, [resultId, getResult]);

	const columns = [
		{
			label: "Question",
			path: "label",
			title: "label",
			reduceTo: 14,
		},
		{
			label: "Type",
			path: "type",
		},
		{
			label: "Answer",
			path: "answer",
		},
		{
			label: "Answer Written",
			path: "answerWritten",
		},
		{
			label: "Total Marks",
			path: "mark",
		},
		{
			label: "Marks Given",
			path: "marksGiven",
		},
		{
			label: "",
			key: "edit_mark",
			render: isTeacher,
			content: (item) => (
				<TextButton
					button={{ label: "Edit Mark" }}
					doSubmit={(mark) => {
						const questionNo = data.indexOf(item);
						editResult(resultId, {
							action: "edit mark",
							questionNo,
							mark,
						});
					}}
				/>
			),
		},
	];

	return (
		<Fragment>
			<section className="actions">
				<BackButton className="btn btn-outline-primary action-item" />

				<div
					className="btn btn-secondary action-item ml-auto"
					style={{ cursor: "initial" }}
				>
					Total marks :{" "}
					{data.reduce(
						(acc, item) => acc + (parseInt(item.marksGiven) || 0),
						0
					)}
				</div>
				{isTeacher && (
					<button
						className="btn btn-primary action-item"
						onClick={() => {
							editResult(resultId, {
								action: "calculate mark",
							});
						}}
					>
						Calculate Marks
					</button>
				)}
			</section>
			<section className="content">
				<div className="content-item fl-1">
					<Table columns={columns} data={data} label={"Answers"} />
				</div>
			</section>
		</Fragment>
	);
};

export default Answers;
