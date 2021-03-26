import moment from "moment";

function getCurrentTime() {
	return new Date();
}

function toLocaleString(date) {
	return date
		.toLocaleString("sv-SE", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		})
		.replace(" ", "T");
}

function toDateObject(date) {
	return new Date(date);
}

function addHour(hour, date) {
	if (typeof date === "string") date = new Date(date);
	date.setHours(date.getHours() + hour);
	return date;
}

function toAmPmString(dateVal) {
	function padValue(value) {
		return value < 10 ? "0" + value : value;
	}

	let newDate = new Date(dateVal);

	let sMonth = padValue(newDate.getMonth() + 1);
	let sDay = padValue(newDate.getDate());
	let sYear = newDate.getFullYear().toString().substring(2, 4);
	let sHour = newDate.getHours();
	let sMinute = padValue(newDate.getMinutes());
	let sAMPM = "AM";

	let iHourCheck = parseInt(sHour);

	if (iHourCheck > 12) {
		sAMPM = "PM";
		sHour = iHourCheck - 12;
	} else if (iHourCheck === 0) {
		sHour = "12";
	}

	sHour = padValue(sHour);

	return `${sDay}-${sMonth}-${sYear} ${sHour}:${sMinute} ${sAMPM}`;
}

function toDisplay(date) {
	return moment(date).calendar(null, {
		sameDay: "[Today at] hh:mm A",
		nextDay: "[Tomorrow at] hh:mm A",
		nextWeek: "dddd [at] hh:mm A",
		lastDay: "[Yesterday at] hh:mm A",
		lastWeek: "DD/MM/YYYY [at] hh:mm",
		sameElse: "DD/MM/YYYY [at] hh:mm",
	});
}

const date = {
	getCurrentTime,
	toLocaleString,
	toDateObject,
	toAmPmString,
	addHour,
	toDisplay,
};

export default date;
