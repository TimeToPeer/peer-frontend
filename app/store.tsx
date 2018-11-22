import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from 'Reducers/auth';
import profileReducer from 'Reducers/profile';
import questsReducer from 'Reducers/quests';
import entryReducer from 'Reducers/entry';
import errorReducer from 'Reducers/error';

import thunk from 'redux-thunk';

const reducers = combineReducers({
	authReducer,
	profileReducer,
	questsReducer,
	errorReducer,
	entryReducer,
});

const store = createStore(
	reducers,
	applyMiddleware(thunk),
);

export default store;
