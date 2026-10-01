import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest, formatDate } from '../api';
import Avatar from './Avatar';

function Comments({ user, postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  const loadComments = () => {
    apiRequest('/posts/' + postId + '/comments').then((data) => setComments(data));
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await apiRequest('/posts/' + postId + '/comments', 'POST', { user_id: user._id, content });
    setContent('');
    loadComments();
  };

  const handleDelete = async (commentId) => {
    await apiRequest('/comments/' + commentId, 'DELETE');
    loadComments();
  };

  return (
    <section className="card">
      <p className="label mt-0">
        {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="input"
          type="text"
          placeholder="Write a comment…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="btn">Post</button>
      </form>
      <div className="mt-5 space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3">
            <Avatar name={comment.username} size="h-8 w-8" />
            <div className="flex-1">
              <p className="text-sm">
                <Link to={'/profile/' + comment.user_id} className="font-bold hover:text-wash">{comment.username}</Link>
                <span className="meta ml-2">{formatDate(comment.created_at)}</span>
              </p>
              <p className="text-sm text-paper/90">{comment.content}</p>
              {(comment.user_id === user._id || user.is_admin) && (
                <button
                  className="mt-1 cursor-pointer font-mono text-[11px] uppercase tracking-[0.15em] text-safelight hover:underline"
                  onClick={() => handleDelete(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Comments;
