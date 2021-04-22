import React, { createContext, useEffect, useState } from "react";
import resultService from "../services/resultService";

export const ResultContext = createContext();
ResultContext.displayName = "ResultContext";

const ResultProvider = ({ children }) => {
	const [results, setResults] = useState([]);
	const [loading, setloading] = useState(true);

	useEffect(() => {
		async function getResults() {
			const { data: results } = await resultService.getResults();
			setResults(results);
			setloading(false);
		}
		getResults();
	}, []);

	function getResult(id) {
		return results.find((r) => r._id === id);
	}

	async function editResult(resultId, body) {
		try {
			const { data } = await resultService.editResult(resultId, body);
			const newResults = [...results];
			const existingResult = results.find((r) => r._id === resultId);
			const index = results.indexOf(existingResult);
			newResults[index] = data;
			setResults(newResults);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<ResultContext.Provider
			value={{ results, loading, getResult, editResult }}
		>
			{children}
		</ResultContext.Provider>
	);
};

export default ResultProvider;
