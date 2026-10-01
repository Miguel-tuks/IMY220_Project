import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api';
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
    return <p className="text-muted">{error || 'Loading...'}</p>;
  }

  const canEdit = post.user_id === user._id || user.is_admin;

  const handleSaved = () => {
    setEditing(false);
    loadPost();
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this post?')) {
      return;
    }

    await apiRequest('/posts/' + id, 'DELETE');
    navigate('/profile/' + post.user_id);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <section>
        <Post post={post} />
        {canEdit && (
          <div className="mt-4 flex gap-2">
            <button className="btn-outline" onClick={() => setEditing(!editing)}>
              {editing ? 'Cancel' : 'Edit post'}
            </button>
            <button className="btn-danger" onClick={handleDelete}>Delete post</button>
          </div>
        )}
        {editing && <EditPost post={post} onSaved={handleSaved} />}
      </section>

      <aside className="space-y-6">
        <Comments user={user} postId={id} />
        <AddToAlbum user={user} postId={id} />
        {post.user_id !== user._id && <ReportPost user={user} postId={id} />}
      </aside>
    </div>
  );
}

export default PostPage;
