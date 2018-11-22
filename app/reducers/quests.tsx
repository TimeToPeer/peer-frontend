import { QUEST_REQUEST, QUEST_INVENTORY } from 'Types/index';

export default (state= {pending: true}, action: any) => {
	switch (action.type) {
		case QUEST_REQUEST: {
			const quest  = action.payload[0];
			return {
				...quest,
				pending: false,
			};
		}
		case QUEST_INVENTORY: {
			const inventory = action.payload;
			return {
				pending: false,
				inventory,
			};
		}
		default:
			return state;
	}
};
