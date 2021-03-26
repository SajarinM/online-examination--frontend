function getTimeFromId(_id) {
	const timestamp = _id.toString().substring(0, 8);
	return new Date(parseInt(timestamp, 16) * 1000).toDateString();
}

const db = {
	getTimeFromId,
};

export default db;
