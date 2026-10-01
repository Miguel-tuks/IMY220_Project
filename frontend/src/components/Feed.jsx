import PostPreview from './PostPreview';
import AlbumPreview from './AlbumPreview';

function Feed({ posts, albums, layout, emptyMessage }) {
  const activity = [
    ...posts.map((post) => ({ ...post, type: 'shot' })),
    ...albums.map((album) => ({ ...album, type: 'roll' }))
  ].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  if (activity.length === 0) {
    return <p className="text-paper/60">{emptyMessage}</p>;
  }

  return (
    <div className={layout === 'grid' ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-6'}>
      {activity.map((item) =>
        item.type === 'shot' ? <PostPreview key={item._id} post={item} /> : <AlbumPreview key={item._id} album={item} />
      )}
    </div>
  );
}

export default Feed;
