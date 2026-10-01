import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiRequest, formatDate } from '../api';
import Post from '../components/Post';
import EditPost from '../components/EditPost';
import Comments from '../components/Comments';
import AddToAlbum from '../components/AddToAlbum';
import ReportPost from '../components/ReportPost';

function PostPage({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const loadPost = () => {
    apiRequest('/posts/' + id)
      .then((data) => setPost(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    loadPost();
  }, [id]);

  if (!post) {
    return <p className="text-paper/60">{error || 'Loading...'}</p>;
  }

  const canEdit = post.user_id === user._id || user.is_admin;

  const handleSaved = () => {
    setEditing(false);
    loadPost();
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this shot?')) {
      return;
    }

    await apiRequest('/posts/' + id, 'DELETE');
    navigate('/profile/' + post.user_id);
  };

  return (
    <>
      <Link to="/home" className="link font-mono text-xs uppercase tracking-[0.15em]">← Back to feed</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_400px]">
        <section>
          <img src={post.image_url} alt={post.description} className="w-full border border-edge bg-edge object-contain" />
          <p className="meta mt-3">Uploaded {formatDate(post.created_at)}</p>
        </section>

        <aside className="space-y-6">
          <Post post={post}>
            {canEdit && (
              <div className="flex gap-2">
                <button className="btn-outline" onClick={() => setEditing(!editing)}>
                  {editing ? 'Cancel' : 'Edit'}
                </button>
                <button className="btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            )}
            <AddToAlbum user={user} postId={id} />
            {post.user_id !== user._id && <ReportPost user={user} postId={id} />}
          </Post>
          {editing && <EditPost post={post} onSaved={handleSaved} />}
          <Comments user={user} postId={id} />
        </aside>
      </div>
    </>
  );
}

export default PostPage;
