import { QUEST_PEER_ENTRIES, POST_COMMENT, QUEST_ENTRY_ASSESSMENT } from 'Types/index';

export default (state = { comments: [{}] }, action: any) => {
	switch (action.type) {
		case QUEST_PEER_ENTRIES:
			let comments = action.payload.comments;
			return {
				...state,
				comments,
			};
		case POST_COMMENT: {
			return {
				...state,
				comments: state.comments.concat(action.payload[0]),
			};
		}
		case QUEST_ENTRY_ASSESSMENT: {
			let comments = action.payload.comments;
			return {
				...state,
				comments,
			};
		}
		default:
			return state;
	}
};
