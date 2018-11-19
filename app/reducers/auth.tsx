import { LOGIN_REQUEST, LOGOUT_REQUEST } from 'Types/index';

export default (state= {loggedIn: false}, action: any) => {
	if (localStorage.getItem('key')) {
		state.loggedIn = true;
	}
	switch (action.type) {
		case LOGIN_REQUEST:
			return {...state, loggedIn: action.payload.loggedIn };
		case LOGOUT_REQUEST:
			return {...state, loggedIn: false};
		default:
			return state;
	}
};
