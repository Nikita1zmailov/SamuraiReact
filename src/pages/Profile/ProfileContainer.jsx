import { Component } from 'react';
import './Profile.scss';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

const withRouter = (WrappedComponent) => (props) => {
	const params = useParams();
	return <WrappedComponent {...props} params={params} />;
};

class ProfileContainer extends Component {
	componentDidMount() {
		let userId = this.props.params.userId;
		if (!userId) userId = 29688;
		this.props.getUserProfile(userId);
	}

	render() {
		return <Profile {...this.props} profile={this.props.profile} />;
	}
}

let mapStateToProps = (state) => ({
	profile: state.postsData.profile,
});

// const AuthRedirectComponent = withAuthRedirect(ProfileContainer);

// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, { getUserProfile })(
// 	WithUrlDataContainerComponent
// );

export default compose(
	connect(mapStateToProps, { getUserProfile }),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
