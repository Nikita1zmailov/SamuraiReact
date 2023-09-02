import CustomLink from '../../../components/CustomLink/CustomLink';
import Preloader from '../../../components/Preloader/Preloader';
import { images } from '../../../constants/images';
import './ProfileInfo.scss';
import { RiUserAddFill } from 'react-icons/ri';
import ProfileStatus from '../ProfileStatus/ProfileStatus';

const ProfileInfo = ({ profile }) => {
	const { user_avatar, user_bg } = images;
	if (!profile) {
		return <Preloader />;
	}
	return (
		<div className="profile">
			<div className="profile-img">
				<div className="img-wrapper">
					<img
						className="user-bg"
						src={profile.photos.large || user_bg}
						alt="user"
					/>
					<img
						className="user-img"
						src={profile.photos.large || user_avatar}
						alt="user"
					/>
				</div>
			</div>
			<div className="profile-content">
				<h5 className="profile-content--name">{profile.fullName}</h5>
				<div className="profile-content--followers">
					<CustomLink to={'/users'}>
						<RiUserAddFill className="followers-icon" />
						<a href="#z" className="followers-link">
							0 followers
						</a>
					</CustomLink>
				</div>
				<ProfileStatus status={'hello'} />
			</div>
		</div>
	);
};

export default ProfileInfo;
