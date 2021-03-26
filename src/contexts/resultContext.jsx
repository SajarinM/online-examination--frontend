import React, { createContext, useEffect, useState } from "react";
import examService from "../services/examService";

export const ResultContext = createContext();
ResultContext.displayName = "ResultContext";

const ResultProvider = ({ children }) => {
	const [examId, setExamId] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setloading] = useState(true);

	useEffect(() => {
		async function getResults() {
			const { data: results } = await examService.getResults(examId);
			setResults(results);
		}
		if (examId) getResults();
	}, [examId]);

	return (
		<ResultContext.Provider value={{ results, loading, setExamId }}>
			{children}
		</ResultContext.Provider>
	);
};

export default ResultProvider;
