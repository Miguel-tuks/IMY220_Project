import { Link } from 'react-router-dom';
import { formatDate } from '../api';
import Avatar from './Avatar';
import RollStrip from './RollStrip';

function ActivityPreview({ activity }) {
  const count = activity.images.length;

  return (
    <article className="card">
      <div className="mb-4 flex items-center gap-3">
        <Avatar name={activity.username} />
        <div>
          <p className="text-sm">
            <Link to={'/profile/' + activity.user_id} className="font-bold hover:text-wash">@{activity.username}</Link>
            {' '}added {count} {count === 1 ? 'shot' : 'shots'} to{' '}
            <Link to={'/album/' + activity.album_id} className="font-bold hover:text-wash">{activity.album_name}</Link>
          </p>
          <p className="meta">{formatDate(activity.created_at)}</p>
        </div>
      </div>
      <RollStrip images={activity.images} link={'/album/' + activity.album_id} />
    </article>
  );
}

export default ActivityPreview;