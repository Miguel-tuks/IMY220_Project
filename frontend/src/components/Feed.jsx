import PostPreview from './PostPreview';

function Feed({ title, posts }) {
  return (
    <section>
      <h2>{title}</h2>
      {posts.map((post) => (
        <PostPreview key={post.post_id} post={post} />
      ))}
    </section>
  );
}

export default Feed;