import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from 'Reducers/auth';
import profileReducer from 'Reducers/profile';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	authReducer,
	profileReducer,
});

const store = createStore(
	reducers,
	applyMiddleware(thunk),
);

export default store;
