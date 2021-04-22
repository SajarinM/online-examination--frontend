function reduceString(string, length, dots = 3) {
	if (string.length <= length + dots) return string;
	return `${string.substring(0, length + 1).trim()}${".".repeat(dots)}`;
}

const string = {
	reduceString,
};

export default string;
