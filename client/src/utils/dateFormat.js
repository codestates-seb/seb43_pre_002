export function timeForToday(value) {
	const today = new Date();
	const timeValue = new Date(value);

	const betweenTime = Math.floor(
		(today.getTime() - timeValue.getTime()) / 1000 / 60,
	);
	if (betweenTime <= 1) return '1min ago';
	if (betweenTime < 60) {
		return `${betweenTime}mins ago`;
	}

	const betweenTimeHour = Math.floor(betweenTime / 60);
	if (betweenTimeHour <= 1) return '1hour ago';
	if (betweenTimeHour < 24) {
		return `${betweenTimeHour}hours ago`;
	}

	const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
	if (betweenTimeDay <= 1) return '1day ago';
	if (betweenTimeDay < 365) {
		return `${betweenTimeDay}days ago`;
	}
	const betweenTimeYear = Math.floor(betweenTimeDay / 365);
	if (betweenTimeYear <= 1) return '1year ago';
	return `${Math.floor(betweenTimeDay / 365)}years ago`;
}

export function dateFormat(date) {
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();

	month = month >= 10 ? month : `0${month}`;
	day = day >= 10 ? day : `0${day}`;
	hour = hour >= 10 ? hour : `0${hour}`;
	minute = minute >= 10 ? minute : `0${minute}`;
	second = second >= 10 ? second : `0${second}`;

	return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
}
