import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api';
import EditAlbum from '../components/EditAlbum';
import Hashtags from '../components/Hashtags';
import PostPreview from '../components/PostPreview';

function AlbumPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [album, setAlbum] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const loadAlbum = () => {
    apiRequest('/albums/' + id)
      .then((data) => setAlbum(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadAlbum();
  }, [id]);

  if (!album) {
    return <p className="text-muted">{error || 'Loading...'}</p>;
  }

  const canEdit = album.user_id === user._id || user.is_admin;

  const handleSaved = () => {
    setEditing(false);
    loadAlbum();
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this album?')) {
      return;
    }

    await apiRequest('/albums/' + id, 'DELETE');
    navigate('/profile/' + album.user_id);
  };

  const removePost = async (postId) => {
    await apiRequest('/albums/' + id + '/posts/' + postId, 'DELETE');
    loadAlbum();
  };

  return (
    <>
      <section className="card mb-8 border-l-4 border-l-film">
        <h1 className="text-4xl font-bold">{album.name}</h1>
        <p className="mt-1 text-sm text-muted">
          by <Link to={'/profile/' + album.user_id} className="link">@{album.username}</Link> · {album.posts.length} {album.posts.length === 1 ? 'photo' : 'photos'}
        </p>
        <p className="mt-3">{album.description}</p>
        <Hashtags hashtags={album.hashtags} />
        {canEdit && (
          <div className="mt-4 flex gap-2">
            <button className="btn-outline" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit album'}
            </button>
            <button className="btn-danger" onClick={handleDelete}>Delete album</button>
          </div>
        )}
      </section>

      {editing && <EditAlbum album={album} onSaved={handleSaved} />}

      <h2 className="mb-4 text-2xl font-bold">Photos</h2>
      {album.posts.length === 0 && (
        <p className="text-muted">No photos yet. Open any post and use "Add to Album".</p>
      )}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {album.posts.map((post) => (
          <div key={post._id}>
            <PostPreview post={post} />
            {canEdit && (
              <button className="btn-outline mt-2 w-full" onClick={() => removePost(post._id)}>
                Remove from album
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default AlbumPage;
