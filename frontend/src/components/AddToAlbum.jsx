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
    setMessage('Added to roll');
  };

  return (
    <div>
      <p className="label mt-0">Add to roll</p>
      {albums.length === 0 ? (
        <p className="text-sm text-paper/60">You have no rolls yet. Create one on your profile.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <select className="input" value={albumId} onChange={(e) => setAlbumId(e.target.value)} required>
            <option value="">Choose a roll</option>
            {albums.map((album) => (
              <option key={album._id} value={album._id}>{album.name}</option>
            ))}
          </select>
          <button type="submit" className="btn-outline">Add</button>
        </form>
      )}
      <p className="success">{message}</p>
    </div>
  );
}

export default AddToAlbum;
