import { FETCH_USERS } from 'Types/index';

export default (state:any= {pending: true}, action: any) => {
	switch (action.type) {
        case FETCH_USERS:
            const users = Object.keys(action.payload).map(key => action.payload[key]);
        
			return {
                pending: false,
                users: users
            };
		default:
			return state;
	}
};
