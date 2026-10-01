import PostList from './PostList';
import AlbumList from './AlbumList';

function Feed({ posts, albums, emptyMessage }) {
  if (posts.length === 0 && albums.length === 0) {
    return <p className="text-muted">{emptyMessage}</p>;
  }

  return (
    <>
      <PostList title="Posts" posts={posts} />
      <AlbumList title="Albums" albums={albums} />
    </>
  );
}

export default Feed;
