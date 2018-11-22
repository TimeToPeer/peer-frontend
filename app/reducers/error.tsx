import { REQUEST_ERROR } from 'Types/index';

export default (state = {}, action: any) => {
	switch (action.type) {
		case REQUEST_ERROR:
			const { success, name } = action.payload;
			if (!success) {
				if (name === 'TokenExpiredError') {
					localStorage.removeItem('key');
					alert('Your session has expired. Please login again');
					window.location.href = '/';
				}
			}
			return {
				...state,
				success: action.payload.success,
				name: action.payload.name,
			};
		default:
			return state;
	}
};
