import { SUBMIT_ASSESSMENT, QUEST_ENTRY_ASSESSMENT } from 'Types/index';

export default (state= { feedback: [{}] }, action: any) => {
	switch (action.type) {
		case SUBMIT_ASSESSMENT: {
			return {
                ...state,
                feedback: state.feedback.concat(action.payload.feedback[0]),
			};
        }
        case QUEST_ENTRY_ASSESSMENT: {
			let feedback = action.payload.feedback;
			return {
				...state,
				feedback,
			};
		}
		default:
			return state;
	}
};
