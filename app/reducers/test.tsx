import { REDUX_TEST } from 'Types/index';

export default (state = {}, action: any) => {
	switch (action.type) {
		case REDUX_TEST:
			return {...state, message: action.payload.message };
		default:
			return state;
	}
};
