import { Link } from 'react-router-dom';
import Avatar from './Avatar';

function ProfilePreview({ profile }) {
  return (
    <Link to={'/profile/' + profile._id} className="flex items-center gap-3 rounded-sm p-1 hover:bg-edge/50">
      <Avatar name={profile.username} image={profile.profile_image} />
      <span>
        <span className="block font-bold">{profile.display_name || profile.username}</span>
        <span className="meta">@{profile.username}</span>
      </span>
    </Link>
  );
}

export default ProfilePreview;