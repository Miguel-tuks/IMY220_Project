import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiRequest, frameNumber } from '../api';
import EditAlbum from '../components/EditAlbum';
import Hashtags from '../components/Hashtags';

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
    return <p className="text-paper/60">{error || 'Loading...'}</p>;
  }

  const canEdit = album.user_id === user._id || user.is_admin;
  const count = album.posts.length;

  const handleSaved = () => {
    setEditing(false);
    loadAlbum();
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this roll?')) {
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
      <section className="card mb-8">
        <p className="meta">Roll · {count} {count === 1 ? 'shot' : 'shots'}</p>
        <h1 className="mt-2 text-5xl">{album.name}</h1>
        <p className="mt-2 text-sm text-paper/60">
          by <Link to={'/profile/' + album.user_id} className="link">@{album.username}</Link>
        </p>
        <p className="mt-3 text-paper/80">{album.description}</p>
        <Hashtags hashtags={album.hashtags} />
        {canEdit && (
          <div className="mt-5 flex gap-2">
            <button className="btn-outline" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit roll'}
            </button>
            <button className="btn-danger" onClick={handleDelete}>Delete roll</button>
          </div>
        )}
      </section>

      {editing && <EditAlbum album={album} onSaved={handleSaved} />}

      {count === 0 ? (
        <p className="text-paper/60">No shots on this roll yet. Open any shot and use "Add to roll".</p>
      ) : (
        <div className="border border-edge bg-ink">
          <div className="sprockets" />
          <div className="grid grid-cols-2 gap-3 p-3 md:grid-cols-4">
            {album.posts.map((post, index) => (
              <div key={post._id}>
                <Link to={'/post/' + post._id} className="relative block border border-edge hover:border-paper/40">
                  <img src={post.image_url} alt={post.description} className="aspect-square w-full bg-edge object-cover" />
                  <span className="absolute bottom-1 left-2 font-mono text-[10px] text-paper">{frameNumber(index)}</span>
                </Link>
                {canEdit && (
                  <button className="btn-outline mt-2 w-full" onClick={() => removePost(post._id)}>
                    Remove from roll
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="sprockets" />
        </div>
      )}
    </>
  );
}

export default AlbumPage;
