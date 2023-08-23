import { Component } from 'react';
import Header from './Header';
import './Header.scss';
import { connect } from 'react-redux';
import { setAuthUserData } from '../../redux/auth-reducer';
import { authAPI } from '../../api/api';

class HeaderContainer extends Component {
	componentDidMount() {
		authAPI.getAuth().then((response) => {
			if (response.data.resultCode === 0) {
				let { login, id, email } = response.data.data;
				this.props.setAuthUserData(id, email, login);
			}
			return response.data.data;
		});
	}
	render() {
		return <Header {...this.props} />;
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);