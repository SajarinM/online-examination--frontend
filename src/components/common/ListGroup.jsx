import React from "react";

const ListGroup = ({
	items,
	selectedItem,
	onItemSelect,
	containerClassName,
	itemClassName,
	itemActiveClassName,
	keyProperty = "_id",
	textProperty = "label",
}) => {
	return (
		<ul className={containerClassName}>
			{items.map((item) => {
				const {
					[keyProperty]: key,
					[textProperty]: label,
					isActive = selectedItem[keyProperty] === item[keyProperty],
					...rest
				} = item;

				return (
					<li
						key={key}
						className={`${itemClassName} ${
							isActive ? itemActiveClassName : ""
						}`}
						onClick={() => onItemSelect(item)}
						{...rest}
					>
						{label}
					</li>
				);
			})}
		</ul>
	);
};

export default ListGroup;
