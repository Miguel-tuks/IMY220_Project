import AlbumPreview from './AlbumPreview';

function AlbumList({ albums }) {
  if (albums.length === 0) {
    return <p className="text-paper/60">No rolls yet.</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {albums.map((album) => (
        <AlbumPreview key={album._id} album={album} showOwner={false} />
      ))}
    </div>
  );
}

export default AlbumList;
