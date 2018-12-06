import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from 'Reducers/auth';
import profileReducer from 'Reducers/profile';
import questsReducer from 'Reducers/quests';
import entryReducer from 'Reducers/entry';
import errorReducer from 'Reducers/error';
import loadingReducer from 'Reducers/loading';
import commentsReducer from 'Reducers/comments';
import assessmentReducer from 'Reducers/assessment';
import classroomReducer from 'Reducers/classroom';
import skillsReducer from 'Reducers/skills';


import thunk from 'redux-thunk';

const reducers = combineReducers({
	authReducer,
	profileReducer,
	questsReducer,
	errorReducer,
	entryReducer,
	loadingReducer,
	commentsReducer,
	assessmentReducer,
	skillsReducer,
	classroomReducer,
});

const store = createStore(
	reducers,
	applyMiddleware(thunk),
);

export default store;
