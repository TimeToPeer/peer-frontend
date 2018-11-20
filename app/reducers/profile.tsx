import { PROFILE_REQUEST, PROFILE_PENDING, PROFILE_SAVED } from 'Types/index';

export default (state= {}, action: any) => {
	switch (action.type) {
		case PROFILE_REQUEST:
			const { userInfo } = action.payload;
			return {
				...state,
				...userInfo,
				saved: false,
				pending: false,
			};
		case PROFILE_PENDING:
			return {
				...state,
				saved: false,
				pending: action.payload.pending,
			};
		case PROFILE_SAVED:
			return {
				...state,
				saved: action.payload.success,
			};
		default:
			return state;
	}
};
