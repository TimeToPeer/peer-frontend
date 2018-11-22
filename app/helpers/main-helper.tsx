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
	return (month + 1)  + '/' + date + '/' + year;
};

export default {
	mapIdToColor,
	formatDate,
};
