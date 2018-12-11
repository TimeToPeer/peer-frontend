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
	const currentDate = new Date(unixDate);
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
	return (month + 1)  + '/' + date + '/' + year + ' ' + strTime;
};

export const formatDataWithoutTime = (unixDate: string) => {
	const currentDate = new Date(unixDate);
	const date = currentDate.getDate();
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();
	return (month + 1)  + '/' + date + '/' + year;
}

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
	formatDataWithoutTime,
	imageUrl,
};
