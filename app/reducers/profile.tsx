import { PROFILE_REQUEST, PROFILE_SAVED } from 'Types/index';

export default (state= {pending: true}, action: any) => {
	switch (action.type) {
		case PROFILE_REQUEST: {
			const userInfo = action.payload[0];
			return {
				...state,
				...userInfo,
				saved: false,
				pending: false,
			};
		}
		case PROFILE_SAVED: {
			const { dispatchData: userInfo } = action.payload;
			return {
				...state,
				...userInfo,
				saved: action.payload.success,
			};
		}
		default:
			return state;
	}
};
