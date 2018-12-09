import { SUBMIT_ASSESSMENT, QUEST_ENTRY_ASSESSMENT, SELECTED_QUEST_ENTRY, FETCHING_ASSESSMENT } from 'Types/index';

export default (state= { pending: true, feedback: [{}] }, action: any) => {
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
				pending: false,
			};
		}
		case SELECTED_QUEST_ENTRY: {
			let quest_entry_id = action.payload;
			return {
				...state,
				quest_entry_id,
			}
		}
		case QUEST_ENTRY_ASSESSMENT: {
			return {
				...state,
				pending: false,
			};
		}
		case FETCHING_ASSESSMENT: {
			return {
				...state,
				pending: true,
			}
		}
		default:
			return state;
	}
};
