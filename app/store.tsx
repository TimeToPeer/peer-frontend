import { createStore, combineReducers, applyMiddleware } from 'redux';
import testReducer from 'Reducers/test';
import thunk from 'redux-thunk';

const reducers = combineReducers({
	testReducer,
});

const store = createStore(
	reducers,
	applyMiddleware(thunk),
);

export default store;
