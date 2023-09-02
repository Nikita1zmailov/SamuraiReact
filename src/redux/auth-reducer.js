import { authAPI } from '../api/api';

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
	userId: null,
	email: null,
	login: null,
	isFetching: false,
	isAuth: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return {
				...state,
				...action.data,
				isAuth: true,
			};
		default:
			return state;
	}
};

const setAuthUserData = (userId, email, login) => ({
	type: SET_USER_DATA,
	data: { userId, email, login },
});

// thunk

export const getAuthUserData = () => {
	return (dispatch) => {
		authAPI.getAuth().then((response) => {
			if (response.data.resultCode === 0) {
				let { login, id, email } = response.data.data;
				dispatch(setAuthUserData(id, email, login));
			}
			return response.data.data;
		});
	};
};

export default authReducer;
