import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const withAuthRedirect = (Component) => {
	const RedirectComponent = (props) => {
		if (!props.isAuth) {
			return <Navigate replace to="/login" />;
		}
		return <Component {...props} />;
	};

	let mapStateToPropsForRedirect = (state) => {
		return {
			isAuth: state.auth.isAuth,
		};
	};

	let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(
		RedirectComponent
	);

	return ConnectedAuthRedirectComponent;
};
