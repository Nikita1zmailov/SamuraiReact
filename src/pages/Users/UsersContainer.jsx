import { connect } from 'react-redux';
import {
	follow,
	unfollow,
	setCurrentPage,
	toggleFollowingProgress,
	getUsers,
} from '../../redux/users-reducer';
import { Component } from 'react';
import Users from './Users';
import './Users.scss';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class UsersContainer extends Component {
	// constructor(props) {
	// 	super(props);
	// }
	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageNumber);
	}

	onPageChanged = (pageNumber) => {
		this.props.getUsers(pageNumber, this.props.currentPage);
	};

	render() {
		return (
			<>
				<Users
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					onPageChanged={this.onPageChanged}
					currentPage={this.props.currentPage}
					users={this.props.users}
					follow={this.props.follow}
					unfollow={this.props.unfollow}
					followingInProgress={this.props.followingInProgress}
					isFetching={this.props.isFetching}
				/>
			</>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		users: state.usersData.users,
		pageSize: state.usersData.pageSize,
		totalUsersCount: state.usersData.totalUsersCount,
		currentPage: state.usersData.currentPage,
		isFetching: state.usersData.isFetching,
		followingInProgress: state.usersData.followingInProgress,
	};
};

//{ let mapDispatchToProps = (dispatch) => {
// 	return {
// 		follow: (userId) => {
// 			dispatch(followAC(userId));
// 		},
// 		unfollow: (userId) => {
// 			dispatch(unfollowAC(userId));
// 		},
// 		setUsers: (users) => {
// 			dispatch(setUsersAC(users));
// 		},
// 		setCurrentPage: (pageNumber) => {
// 			dispatch(setCurrentPageAC(pageNumber));
// 		},
// 		setTotalUsersCount: (totalCount) => {
// 			dispatch(setTotalUsersCountAC(totalCount));
// 		},
// 		toggleIsFetching: (isFetching) => {
// 			dispatch(toggleIsFetchingAC(isFetching));
// 		},
// 	};
// };}

// export default connect(mapStateToProps, {
// 	follow,
// 	unfollow,
// 	setCurrentPage,
// 	toggleFollowingProgress,
// 	getUsers,
// })(UsersContainer);

export default compose(
	withAuthRedirect,
	connect(mapStateToProps, {
		follow,
		unfollow,
		setCurrentPage,
		toggleFollowingProgress,
		getUsers,
	})
)(UsersContainer);
