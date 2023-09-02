import { Component } from 'react';
import './ProfileStatus.scss';

class ProfileStatus extends Component {
	state = {
		editMode: false,
	};

	toggleEditMode = () => {
		this.setState({
			editMode: !this.state.editMode,
		});
	};

	render() {
		return (
			<div className="status-wrapper">
				{!this.state.editMode ? (
					<div className="status-message">
						<span onDoubleClick={this.toggleEditMode}>
							{this.props.status}
						</span>
					</div>
				) : (
					<div className="status-input">
						<input
							autoFocus
							value={this.props.status}
							onBlur={this.toggleEditMode}
						/>
					</div>
				)}
			</div>
		);
	}
}
export default ProfileStatus;
