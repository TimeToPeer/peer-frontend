import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from 'Reducers/auth';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	authReducer,
});

const store = createStore(
	reducers,
	applyMiddleware(thunk),
);

export default store;
