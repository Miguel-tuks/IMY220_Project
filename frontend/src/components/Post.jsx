import { Link } from 'react-router-dom';
import PostImage from './PostImage';
import Hashtags from './Hashtags';

function Post({ post }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
      <PostImage imageUrl={post.image_url} description={post.description} />
      <div className="p-5">
        <p className="text-sm text-muted">
          Posted by <Link to={'/profile/' + post.user_id} className="link">@{post.username}</Link> on{' '}
          {new Date(post.created_at).toLocaleDateString()}
        </p>
        <p className="mt-2 text-lg">{post.description}</p>
        <Hashtags hashtags={post.hashtags} />
      </div>
    </article>
  );
}

export default Post;
