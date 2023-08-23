import { Component } from 'react';
import './Profile.scss';
import Profile from './Profile';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { usersAPI } from '../../api/api';

const withRouter = (WrappedComponent) => (props) => {
	const params = useParams();
	return <WrappedComponent {...props} params={params} />;
};

class ProfileContainer extends Component {
	componentDidMount() {
		let userId = this.props.params.userId;
		if (!userId) userId = 2;
		usersAPI.getProfile(userId).then((response) => {
			this.props.setUserProfile(response.data);
		});
	}

	render() {
		return <Profile {...this.props} profile={this.props.profile} />;
	}
}

let mapStateToProps = (state) => ({
	profile: state.postsData.profile,
});

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, { setUserProfile })(
	WithUrlDataContainerComponent
);
