import { LOGIN_REQUEST, LOGOUT_REQUEST, PROFILE_REQUEST, PROFILE_SAVED,
	QUEST_ENTRY_ASSESSMENT, QUEST_REQUEST, REQUEST_ERROR, QUEST_SUBMIT, QUEST_INVENTORY, QUEST_PEER_ENTRIES, SHOW_LOADING,
	GET_COMMENTS, POST_COMMENT, SUBMIT_ASSESSMENT, CLASSROOM_DATA, FETCHING_CLASSDATA, GET_SKILLS } from 'Types/index';
import { mapTypeToUrl } from 'Helpers/fetch-helper';

const sendDataToApi = (type: string, data: any, dispatchData?: any ) => {
	return (dispatch: any) => {
		const url = mapTypeToUrl(type);
		const token = localStorage.getItem('key');
		return fetch(
			url,
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json', 'Authorization': token},
				body: JSON.stringify({
					...data,
				}),
			},
		).then((response) => {
			if (response.status !== 200) {
				throw response;
			}
			return response.json();
		}).then((res) => {
			if (dispatchData) {
				dispatch({
					type,
					payload: {
						...res,
						dispatchData,
					},
				});
			} else {
				dispatch({
					type,
					payload: {
						...res,
					},
				});
			}
			dispatch({
				type: REQUEST_ERROR,
				payload: {
					success: true,
					name: '',
				},
			});
		}).catch((err) => {
			dispatch({
				type: SHOW_LOADING,
				payload: {
					isLoading: false,
				},
			});
			dispatch({
				type: REQUEST_ERROR,
				payload: {
					success: false,
					name: err.statusText,
				},
			});
		});
	};
};

export const logoutUser = () => {
	return sendDataToApi(LOGOUT_REQUEST, {});
};

export const authUser = (object: any) => {
	return sendDataToApi(LOGIN_REQUEST, object);
};

export const getUser = () => {
	return sendDataToApi(PROFILE_REQUEST, {});
};

export const saveUser = (userInfo: any) => {
	return sendDataToApi(PROFILE_SAVED, userInfo, userInfo);
};

export const getQuests = (data: any) => {
	return sendDataToApi(QUEST_INVENTORY, data);
};

export const getQuestById = (data: any) => {
	return sendDataToApi(QUEST_REQUEST, data);
};

export const submitQuest = (data: any) => {
	return sendDataToApi(QUEST_SUBMIT, data);
};

export const getQuestEntry = (data: any) => {
	return sendDataToApi(QUEST_ENTRY_ASSESSMENT, data);
};

export const getPeerQuests = (data: any) => {
	return sendDataToApi(QUEST_PEER_ENTRIES, data);
};

export const showLoading = (isLoading: boolean) => {
	return (dispatch: any) => {
		dispatch({
			type: SHOW_LOADING,
			payload: {
				isLoading,
			},
		});
	};
};

export const getQuestComments = (data: any) => {
	return sendDataToApi(GET_COMMENTS, data);
};

export const postQuestComment = (data: any) => {
	return sendDataToApi(POST_COMMENT, data);
};

export const postAssessment = (data: any) => {
	return sendDataToApi(SUBMIT_ASSESSMENT, data);
}

export const getClassroomData = (data: any) => {
	return sendDataToApi(CLASSROOM_DATA, data);
}

export const fetchinClassroomData = () => {
	return (dispatch: any) => {
		dispatch({
			type: FETCHING_CLASSDATA,
		});
	};
}

export const getSkills = () => {
	return sendDataToApi(GET_SKILLS, {});
}
