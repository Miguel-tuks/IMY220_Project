import { Link } from 'react-router-dom';

function PostPreview({ post }) {
  return (
    <article>
      <h4>
        <Link to={'/post/' + post.post_id}>{post.caption}</Link>
      </h4>
      <img src={post.image_url} alt={post.caption} />
      <p>
        By <Link to={'/profile/' + post.user_id}>{post.username}</Link>
      </p>
    </article>
  );
}

export default PostPreview;