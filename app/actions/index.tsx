import { REDUX_TEST } from 'Types/index';

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
