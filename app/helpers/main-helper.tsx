
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')


export const mapIdToColor = (id: number) => {
	if (id === 0) {
		return 'caramel';
	} else if (id === 1) {
		return 'salt';
	} else if (id === 2) {
		return 'grape';
	} else if (id === 3) {
		return 'bubble';
	} else if (id === 4) {
		return 'hershey';
	} else if (id === 5) {
		return 'sour';
	} else if (id === 6) {
		return 'peach';
	} else if (id === 7) {
		return 'lemon';
	} else {
		return 'caramel';
	}
};

export const formatDate = (unixDate: string) => {
	const TWENTY_FOUR_HOURS = 60*60*1000*24;
	const now: any = new Date();
	const currentDate: any = new Date(unixDate);
	const date = currentDate.getDate();
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();
	var hours = currentDate.getHours();
	var minutes = currentDate.getMinutes();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const minString = minutes < 10 ? '0' + minutes : minutes;
	var strTime = hours + ':' + minString + ' ' + ampm;
	if (now - currentDate <= TWENTY_FOUR_HOURS) {
		return timeAgo.format(currentDate, 'twitter') + ' ago';
	}
	return (month + 1)  + '/' + date + '/' + year + ' ' + strTime;
};

export const imageUrl = (imageUrl: string) => {
	let url = '';
	if (document.location.hostname === 'localhost') {
		url = 'http://localhost:3000';
	} else {
		url = 'https://timetopeer.ca';
	}
	url += '/' + imageUrl;
	return url;
}


export default {
	mapIdToColor,
	formatDate,
	imageUrl,
};
