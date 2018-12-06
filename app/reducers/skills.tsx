import { GET_SKILLS } from 'Types/index';

export default (state = {pending: true}, action: any) => {
	switch (action.type) {
        case GET_SKILLS:
			return {...state, skills: action.payload, pending: false };
		default:
			return state;
	}
};
