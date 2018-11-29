import { SHOW_LOADING } from 'Types/index';

export default (state = {isLoading: false}, action: any) => {
	switch (action.type) {
		case SHOW_LOADING:
			return {isLoading: action.payload.isLoading };
		default:
			return state;
	}
};
