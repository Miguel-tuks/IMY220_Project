import AlbumPreview from './AlbumPreview';

function AlbumList({ title, albums }) {
  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {albums.length === 0 && <p className="text-muted">No albums yet.</p>}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <AlbumPreview key={album._id} album={album} />
        ))}
      </div>
    </section>
  );
}

export default AlbumList;
