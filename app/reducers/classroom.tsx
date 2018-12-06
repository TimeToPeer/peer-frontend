import { CLASSROOM_DATA, FETCHING_CLASSDATA } from 'Types/index';

export default (state: any = {pending: true}, action: any) => {
	switch (action.type) {
        case FETCHING_CLASSDATA: 
            return {
                ...state,
                pending: true,
            }
        case CLASSROOM_DATA:
            const {entry, students, feedback, comments} = action.payload;
            const entryObj: any = {};
            entry.forEach((item: any) => {
                entryObj[item.created_by] = item;
            });

            state.entry = entryObj;
            state.students = students;
            state.feedback = feedback;
            state.comments = comments;

			return {
                ...state,
                pending: false,
            };
		default:
			return state;
	}
};
