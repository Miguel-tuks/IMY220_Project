import { Link } from 'react-router-dom';
import PostImage from './PostImage';
import Hashtags from './Hashtags';

function PostPreview({ post }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-card shadow-sm">
      <Link to={'/post/' + post._id}>
        <PostImage imageUrl={post.image_url} description={post.description} />
      </Link>
      <div className="p-4">
        <Link to={'/profile/' + post.user_id} className="link text-sm">@{post.username}</Link>
        <p className="mt-1">{post.description}</p>
        <Hashtags hashtags={post.hashtags} />
      </div>
    </article>
  );
}

export default PostPreview;
