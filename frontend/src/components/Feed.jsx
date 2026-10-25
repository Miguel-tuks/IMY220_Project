import PostPreview from './PostPreview';
import AlbumPreview from './AlbumPreview';
import ActivityPreview from './ActivityPreview';

function Feed({ posts, albums, activities, sort, layout, emptyMessage }) {
  const items = [
    ...posts.map((post) => ({ ...post, type: 'shot' })),
    ...albums.map((album) => ({ ...album, type: 'roll' })),
    ...activities.map((activity) => ({ ...activity, type: 'added' }))
  ];

  const byNewest = (a, b) => new Date(b.created_at) - new Date(a.created_at);
  const byComments = (a, b) => (b.comment_count || 0) - (a.comment_count || 0) || byNewest(a, b);
  items.sort(sort === 'comments' ? byComments : byNewest);

  if (items.length === 0) {
    return <p className="text-paper/60">{emptyMessage}</p>;
  }

  return (
    <div className={layout === 'grid' ? 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-6'}>
      {items.map((item) => {
        if (item.type === 'shot') return <PostPreview key={item._id} post={item} />;
        if (item.type === 'roll') return <AlbumPreview key={item._id} album={item} />;
        return <ActivityPreview key={item._id} activity={item} />;
      })}
    </div>
  );
}

export default Feed;