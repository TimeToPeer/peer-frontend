import { QUEST_PEER_ENTRIES, POST_COMMENT } from 'Types/index';

export default (state = { comments: [{}] }, action: any) => {
	switch (action.type) {
		case QUEST_PEER_ENTRIES:
			const comments = action.payload.comments;
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
		default:
			return state;
	}
};
