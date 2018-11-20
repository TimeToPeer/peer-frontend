import { REDUX_TEST, LOGIN_REQUEST, LOGOUT_REQUEST, PROFILE_REQUEST, PROFILE_PENDING, PROFILE_SAVED } from 'Types/index';
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

export const getUser = () => {
	return (dispatch: any) => {
		const url = fetchUrl('/get/users/test.user90');
		const token = localStorage.getItem('key');
		dispatch({
			type: PROFILE_PENDING,
			payload: {
				pending: true,
			},
		});

		return fetch(url, {headers: {'Content-Type': 'application/json', 'Authorization': token}})
			.then((response) => response.json())
			.then((data) => {
				dispatch({
					type: PROFILE_REQUEST,
					payload: {
						userInfo: data[0],
					},
				});
			},
		);
	};
};

export const saveUser = (userInfo: any) => {
	return (dispatch: any) => {
		const url = fetchUrl('/post/users/update_account');
		const token = localStorage.getItem('key');
		return fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json', 'Authorization': token},
			body: JSON.stringify({
				userInfo,
			}),
		}).then((response) => response.json())
		.then((responseJson) => {
			dispatch({
				type: PROFILE_SAVED,
				payload: {
					success: true,
				},
			});
		}).catch((err) => {
			dispatch({
				type: PROFILE_SAVED,
				payload: {
					success: false,
				},
			});
		});
	};
};
