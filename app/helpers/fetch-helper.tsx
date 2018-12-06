import { LOGIN_REQUEST, LOGOUT_REQUEST, PROFILE_REQUEST, PROFILE_SAVED,
	QUEST_REQUEST, QUEST_SUBMIT, QUEST_ENTRY_ASSESSMENT, QUEST_INVENTORY, QUEST_PEER_ENTRIES,
	GET_COMMENTS, POST_COMMENT, SUBMIT_ASSESSMENT, CLASSROOM_DATA, GET_SKILLS} from 'Types/index';

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
		case QUEST_ENTRY_ASSESSMENT:
			return url += '/get/quests/entry/asessment';
		case QUEST_INVENTORY:
			return url += '/get/quests/inventory';
		case QUEST_PEER_ENTRIES:
			return url += '/get/quests/entries';
		case GET_COMMENTS:
			return url += '/get/quests/comments';
		case POST_COMMENT:
			return url += '/post/quests/comment/submit';
		case SUBMIT_ASSESSMENT:
			return url += '/post/quests/assessment/feedback';
		case CLASSROOM_DATA:
			return url += '/get/quests/classroom';
		case GET_SKILLS:
			return url += '/get/quests/skills';
		default:
			return url += '';
	}
};

export default {
	mapTypeToUrl,
};
