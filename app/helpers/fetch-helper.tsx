export const fetchUrl = (path: string) => {
	let url = '';
	if (document.location.hostname === 'localhost') {
		url = 'http://localhost:8080';
	} else {
		url = 'https://api.timetopeer.ca';
	}
	url += path;

	return url;
};

export default {
	fetchUrl,
};
