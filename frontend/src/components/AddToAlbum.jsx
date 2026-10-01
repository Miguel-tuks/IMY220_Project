import { useEffect, useState } from 'react';
import { apiRequest } from '../api';

function AddToAlbum({ user, postId }) {
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    apiRequest('/albums/user/' + user._id).then((data) => setAlbums(data));
  }, [user._id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiRequest('/albums/' + albumId + '/posts', 'POST', { post_id: postId });
    setAlbumId('');
    setMessage('Added to album');
  };

  return (
    <section className="card">
      <h2 className="text-xl font-bold">Add to Album</h2>
      {albums.length === 0 ? (
        <p className="mt-2 text-sm text-muted">You have no albums yet. Create one on your profile.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
          <select className="input" value={albumId} onChange={(e) => setAlbumId(e.target.value)} required>
            <option value="">Choose an album</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>{album.name}</option>
            ))}
          </select>
          <button type="submit" className="btn">Add</button>
        </form>
      )}
      <p className="success">{message}</p>
    </section>
  );
}

export default AddToAlbum;
