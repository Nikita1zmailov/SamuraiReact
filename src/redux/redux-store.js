import { applyMiddleware, combineReducers, createStore } from 'redux';
import profileReducer from '../redux/profile-reducer';
import dialogReducer from '../redux/dialogs-reducer';
import sidebarReducer from '../redux/sidebar-reducer';
import usersReducer from '../redux/users-reducer';
import authReducer from '../redux/auth-reducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
	postsData: profileReducer,
	dialogData: dialogReducer,
	sidebarData: sidebarReducer,
	usersData: usersReducer,
	auth: authReducer,
	//! examples how it works
	// profileReducer: profileReducer,
	// dialogReducer: dialogReducer,
	// sidebarReducer: sidebarReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
