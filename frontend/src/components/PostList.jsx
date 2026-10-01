import PostPreview from './PostPreview';

function PostList({ title, posts }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {posts.length === 0 && <p className="text-muted">No posts yet.</p>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostPreview key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default PostList;
