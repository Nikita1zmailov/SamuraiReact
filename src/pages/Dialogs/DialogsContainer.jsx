import { connect } from 'react-redux';
import {
	sendMessageCreator,
	updateNewMessageBodyCreator,
} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

// const DialogsContainer = () => {
// 	return (
// 		<ProviderTwo.Consumer>
// 			{(store) => {
// 				let onNewMessageChange = (body) => {
// 					store.dispatch(updateNewMessageBodyCreator(body));
// 				};

// 				let onSendMessageClick = () => {
// 					store.dispatch(sendMessageCreator());
// 				};
// 				return (
// 					<Dialogs
// 						updateNewMessageBody={onNewMessageChange}
// 						sendMessage={onSendMessageClick}
// 						dialogsPage={store.getState().dialogData}
// 					/>
// 				);
// 			}}
// 		</ProviderTwo.Consumer>
// 	);
// };

let mapStateToProps = (state) => {
	return {
		dialogsPage: state.dialogData,
	};
};
let mapDispatchToProps = (dispatch) => {
	return {
		updateNewMessageBody: (body) => {
			dispatch(updateNewMessageBodyCreator(body));
		},
		sendMessage: () => {
			dispatch(sendMessageCreator());
		},
	};
};

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(AuthRedirectComponent);

// export default DialogsContainer;

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withAuthRedirect
)(Dialogs);
