import { usersAPI } from '../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT';

let initialState = {
	users: [],
	pageSize: 5,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW:
			return {
				...state,
				// users:[...state.users],
				users: state.users.map((user) => {
					if (user.id === action.userId) {
						return { ...user, followed: true };
					}
					return user;
				}),
			};
		case UNFOLLOW:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.userId) {
						return { ...user, followed: false };
					}
					return user;
				}),
			};
		case SET_USERS: {
			return {
				...state,
				users: action.users,
			};
		}
		case SET_CURRENT_PAGE: {
			return { ...state, currentPage: action.currentPage };
		}
		case TOGGLE_IS_FETCHING: {
			return { ...state, isFetching: action.isFetching };
		}
		case SET_TOTAL_USERS_COUNT: {
			return { ...state, totalUsersCount: action.count };
		}
		case TOGGLE_IS_FOLLOWING_PROGRESS: {
			return {
				...state,
				followingInProgress: action.isFetching
					? [...state.followingInProgress, action.userId]
					: state.followingInProgress.filter((id) => id !== action.userId),
			};
		}
		default:
			return state;
	}
};

// REDUX-ACTIONs-CREATORs

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users: users });
export const setCurrentPage = (currentPage) => ({
	type: SET_CURRENT_PAGE,
	currentPage,
});
export const toggleIsFetching = (isFetching) => ({
	type: TOGGLE_IS_FETCHING,
	isFetching,
});
export const toggleFollowingProgress = (isFetching, userId) => ({
	type: TOGGLE_IS_FOLLOWING_PROGRESS,
	isFetching,
	userId,
});
export const setTotalUsersCount = (totalUsersCount) => {
	// ! change with time
	if (totalUsersCount > 200) {
		return {
			type: SET_TOTAL_USERS_COUNT,
			count: 40,
		};
	}
	return {
		type: SET_TOTAL_USERS_COUNT,
		count: totalUsersCount,
	};
};

// REDUX-THUNKs-CREATORs

export const getUsers = (currentPage, pageSize) => {
	return (dispatch) => {
		dispatch(toggleIsFetching(true));
		usersAPI.getUsers(currentPage, pageSize).then((response) => {
			dispatch(toggleIsFetching(false));
			dispatch(setCurrentPage(currentPage));
			dispatch(setUsers(response.items));
			dispatch(setTotalUsersCount(response.totalCount));
		});
	};
};

export const unfollow = (userId) => {
	return (dispatch) => {
		dispatch(toggleFollowingProgress(true, userId));
		usersAPI.getUnfollow(userId).then((response) => {
			if (response.data.resultCode === 0) {
				dispatch(unfollowSuccess(userId));
			}
			dispatch(toggleFollowingProgress(false, userId));
		});
	};
};

export const follow = (userId) => {
	return (dispatch) => {
		dispatch(toggleFollowingProgress(true, userId));
		usersAPI.getFollow(userId).then((response) => {
			if (response.data.resultCode === 0) {
				dispatch(followSuccess(userId));
			}
			dispatch(toggleFollowingProgress(false, userId));
		});
	};
};

export default usersReducer;
