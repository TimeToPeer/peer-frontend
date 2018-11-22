import { LOGIN_REQUEST, LOGOUT_REQUEST } from 'Types/index';

export default (state= {loggedIn: false}, action: any) => {
	if (localStorage.getItem('key')) {
		state.loggedIn = true;
	}
	switch (action.type) {
		case LOGIN_REQUEST:
			if (action.payload.token) {
				localStorage.setItem('key', action.payload.token);
			}
			return {...state, loggedIn: true };
		case LOGOUT_REQUEST:
			localStorage.removeItem('key');
			window.location.href = '/';
			return {...state, loggedIn: false};
		default:
			return state;
	}
};
