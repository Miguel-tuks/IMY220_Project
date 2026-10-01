import { Link } from 'react-router-dom';
import Avatar from './Avatar';

function ProfilePreview({ profile }) {
  return (
    <Link to={'/profile/' + profile._id} className="flex items-center gap-3 rounded-sm p-1 hover:bg-edge/50">
      <Avatar name={profile.username} image={profile.profile_image} />
      <span className="font-bold">@{profile.username}</span>
    </Link>
  );
}

export default ProfilePreview;
