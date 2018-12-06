import { QUEST_ENTRY_ASSESSMENT, QUEST_PEER_ENTRIES, SUBMIT_ASSESSMENT } from 'Types/index';

export default (state:any= {pending: true}, action: any) => {
	switch (action.type) {
		case QUEST_ENTRY_ASSESSMENT: {
			const entries  = action.payload.entries;
			return {
				entries,
				pending: false,
			};
		}
		case QUEST_PEER_ENTRIES: {
			const entries = action.payload.entries;
			return {
				entries,
				pending: false,
			};
		}
		case SUBMIT_ASSESSMENT: {
			const thisState = {...state};
			if (action.payload.entry[0]) {
				const fuck = thisState.entries[0];
				const { teacher_creative, teacher_critical, teacher_responsible } = action.payload.entry[0];
				thisState.entries[0].teacher_creative = teacher_creative;
				thisState.entries[0].teacher_critical = teacher_critical;
				thisState.entries[0].teacher_responsible = teacher_responsible;
			}
			return {
                ...thisState,
                // feedback: state.feedback.concat(action.payload[0]),
			};
        }
		default:
			return state;
	}
};
