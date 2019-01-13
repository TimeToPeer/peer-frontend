import { FETCH_USERS, PROFILE_SAVED } from 'Types/index';

export default (state:any= {pending: true}, action: any) => {
	switch (action.type) {
        case FETCH_USERS: {
            const users = Object.keys(action.payload).map(key => action.payload[key]);
			return {
                pending: false,
                users: users
            };
        }
        case PROFILE_SAVED: {
            const { dispatchData: userInfo } = action.payload;
            const { first_name, last_name, icon, personality, class_code } = userInfo;
            const userIndex = state.users.findIndex((user: any) => user.id === userInfo.id);
            const user = state.users.find((user: any) => user.id === userInfo.id);
            const users = [ ...state.users ];
            users[userIndex] = {
                ...user,
                first_name: first_name,
                last_name: last_name,
                icon: Number(icon),
                personality: personality,
                class_code: class_code,
            };
            return {
                ...state,
                saved: action.payload.success,
                users: users
            };
        }
		default:
			return state;
	}
};
