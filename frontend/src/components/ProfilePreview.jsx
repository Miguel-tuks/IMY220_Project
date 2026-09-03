import { Link } from 'react-router-dom';

function ProfilePreview({ profile }) {
  return (
    <article>
      <Link to={'/profile/' + profile.user_id}>{profile.username}</Link>
    </article>
  );
}

export default ProfilePreview;