import React from "react";
import "./Table.scss";
import _ from "lodash";

const Table = ({ columns, data, serialNo }) => {
	function createKey(item, column) {
		return item._id + (column.path || column.key);
	}

	function renderCell(item, column) {
		if (column.content) return column.content(item);

		return _.get(item, column.path);
	}

	columns.forEach((column) => {
		column.render = column.render === undefined ? true : column.render;
	});

	return (
		<table className="table">
			<thead>
				<tr>
					{serialNo && <th>{serialNo}</th>}
					{columns.map(
						(column) =>
							column.render && (
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
								column.render && (
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
