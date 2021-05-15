import React from "react";
import "./Table.scss";
import _ from "lodash";
import string from "../../../utilities/string";

const Table = ({ columns, data, serialNo, className, label = "data" }) => {
	function createKey(item, column) {
		return item._id + (column.path || column.key);
	}

	function renderCell(item, column) {
		const { content, title, path, reduceTo } = column;
		if (content) return content(item);
		let value = _.get(item, path);
		if (reduceTo) {
			value = string.reduceString(value, reduceTo);
		}
		if (title) return <div title={_.get(item, title)}>{value}</div>;
		return value;
	}

	columns.forEach((column) => {
		column.condition =
			column.condition === undefined ? true : column.condition;
	});

	if (!data.length)
		return <div className="u-x-center">No {label} to show</div>;

	return (
		<table className={`table ${className}`}>
			<thead>
				<tr>
					{serialNo && <th>{serialNo}</th>}
					{columns.map(
						(column) =>
							column.condition && (
								<th key={column.path || column.key}>
									{column.label}
								</th>
							)
					)}
				</tr>
			</thead>
			<tbody>
				{data.map((item, index) => (
					<tr key={item._id}>
						{serialNo && <td>{index + 1}</td>}
						{columns.map((column) => {
							return (
								column.condition && (
									<td key={createKey(item, column)}>
										{renderCell(item, column)}
									</td>
								)
							);
						})}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
