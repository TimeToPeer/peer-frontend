import { QUEST_ENTRY, QUEST_PEER_ENTRIES } from 'Types/index';

export default (state= {pending: true}, action: any) => {
	switch (action.type) {
		case QUEST_ENTRY: {
			const quest  = action.payload[0];
			return {
				...quest,
				pending: false,
			};
		}
		case QUEST_PEER_ENTRIES: {
			const entries = action.payload;
			return {
				entries,
				pending: false,
			};
		}
		default:
			return state;
	}
};
