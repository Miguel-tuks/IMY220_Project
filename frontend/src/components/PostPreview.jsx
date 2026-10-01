import { Link } from 'react-router-dom';
import { formatDate } from '../api';
import Avatar from './Avatar';
import PostImage from './PostImage';
import Hashtags from './Hashtags';

function PostPreview({ post }) {
  return (
    <article className="card overflow-hidden p-0">
      <div className="flex items-center gap-3 p-4">
        <Avatar name={post.username} />
        <div>
          <p className="text-sm">
            <Link to={'/profile/' + post.user_id} className="font-bold hover:text-wash">@{post.username}</Link> posted a new shot
          </p>
          <p className="meta">{formatDate(post.created_at)}</p>
        </div>
      </div>
      <Link to={'/post/' + post._id}>
        <PostImage imageUrl={post.image_url} description={post.description} />
      </Link>
      <div className="p-4">
        <p>{post.description}</p>
        <Hashtags hashtags={post.hashtags} />
        <Link to={'/post/' + post._id} className="link mt-4 inline-block font-mono text-xs uppercase tracking-[0.15em]">
          Open shot →
        </Link>
      </div>
    </article>
  );
}

export default PostPreview;
