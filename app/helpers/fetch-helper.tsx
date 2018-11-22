import { REDUX_TEST, LOGIN_REQUEST, LOGOUT_REQUEST, PROFILE_REQUEST, PROFILE_SAVED,
	QUEST_RECEIVED, QUEST_REQUEST, QUEST_SUBMIT, QUEST_ENTRY, QUEST_INVENTORY, QUEST_PEER_ENTRIES } from 'Types/index';

export const mapTypeToUrl = (type: string) => {
	let url = '';
	if (document.location.hostname === 'localhost') {
		url = 'http://localhost:8080';
	} else {
		url = 'https://api.timetopeer.ca';
	}

	switch (type) {
		case QUEST_REQUEST:
			return url += '/get/quests/id';
		case LOGIN_REQUEST:
			return url += '/post/users/create_account';
		case LOGOUT_REQUEST:
			return url += '/post/users/logout_user';
		case PROFILE_REQUEST:
			return url += '/get/users/';
		case PROFILE_SAVED:
			return url += '/post/users/update_account';
		case QUEST_SUBMIT:
			return url += '/post/quests/submit';
		case QUEST_ENTRY:
			return url += '/get/quests/entry';
		case QUEST_INVENTORY:
			return url += '/get/quests/inventory';
		case QUEST_PEER_ENTRIES:
			return url += '/get/quests/entries';
		default:
			return url += '';
	}
};

export default {
	mapTypeToUrl,
};
