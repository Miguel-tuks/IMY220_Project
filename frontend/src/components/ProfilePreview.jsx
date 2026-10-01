import { Link } from 'react-router-dom';

function ProfilePreview({ profile }) {
  return (
    <Link to={'/profile/' + profile._id} className="flex items-center gap-3 rounded-lg p-1 hover:bg-paper">
      <img src={profile.profile_image} alt={profile.username} className="h-9 w-9 rounded-full bg-line object-cover" />
      <span className="font-medium">@{profile.username}</span>
    </Link>
  );
}

export default ProfilePreview;
