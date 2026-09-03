import PostImage from './PostImage';
import Comments from './Comments';

function Post({ post }) {
  return (
    <article>
      <h1>{post.caption}</h1>
      <p>By {post.username}</p>
      <PostImage imageUrl={post.image_url} caption={post.caption} />
      <p>{post.description}</p>
      <Comments comments={post.comments} />
    </article>
  );
}

export default Post;