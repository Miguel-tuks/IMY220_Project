import PostPreview from './PostPreview';

function PostList({ posts }) {
  return (
    <section>
      <h2>Posts</h2>
      {posts.map((post) => (
        <PostPreview key={post.post_id} post={post} />
      ))}
    </section>
  );
}

export default PostList;