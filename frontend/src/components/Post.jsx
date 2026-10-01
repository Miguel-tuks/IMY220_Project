import { Link } from 'react-router-dom';
import { formatDate } from '../api';
import Avatar from './Avatar';
import Hashtags from './Hashtags';

function Post({ post, children }) {
  return (
    <article className="card">
      <div className="flex items-center gap-3">
        <Avatar name={post.username} />
        <div>
          <Link to={'/profile/' + post.user_id} className="font-bold hover:text-wash">@{post.username}</Link>
          <p className="meta">{formatDate(post.created_at)}</p>
        </div>
      </div>
      <p className="mt-4 text-lg">{post.description}</p>
      <Hashtags hashtags={post.hashtags} />
      <div className="mt-5 space-y-5 border-t border-edge pt-5">{children}</div>
    </article>
  );
}

export default Post;
