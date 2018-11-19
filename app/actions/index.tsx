import { REDUX_TEST, LOGIN_REQUEST, LOGOUT_REQUEST } from 'Types/index';
import { fetchUrl } from 'Helpers/fetch-helper';

export const testRedux = (message: string) => {
	return (dispatch: any) => {
		dispatch({
			type: REDUX_TEST,
			payload: {
				message,
			},
		});
	};
};

export const logoutUser = () => {
	return (dispatch: any) => {
		dispatch({
			type: LOGOUT_REQUEST,
		});
	};
};

export const authUser = (object: any) => {
	return (dispatch: any) => {
		const { userName, password } = object;
		const url = fetchUrl('/post/users/create_account');
		let loggedIn = false;

		return fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				userName,
				password,
			}),
		}).then((response) =>
			response.json(),
		).then((responseJson) => {
			if (responseJson.success) {
				localStorage.setItem('key', responseJson.token);
				loggedIn = true;
			}

			dispatch({
				type: LOGIN_REQUEST,
				payload: {
					loggedIn,
				},
			});
		}).catch((err) => {
			dispatch({
				type: LOGIN_REQUEST,
				payload: {
					loggedIn: false,
				},
			});
		});
	};
};
