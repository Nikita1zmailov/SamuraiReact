import { Component } from 'react';
import Header from './Header';
import './Header.scss';
import { connect } from 'react-redux';
import { getAuthUserData } from '../../redux/auth-reducer';

class HeaderContainer extends Component {
	componentDidMount() {
		this.props.getAuthUserData();
	}
	render() {
		return <Header {...this.props} />;
	}
}

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	login: state.auth.login,
});

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
