import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';

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
      <h2 className="text-xl font-bold">Comments</h2>
      {comments.length === 0 && <p className="mt-2 text-sm text-muted">No comments yet.</p>}
      <div className="mt-3 space-y-3">
        {comments.map((comment) => (
          <div key={comment._id} className="border-b border-line pb-2">
            <Link to={'/profile/' + comment.user_id} className="link text-sm">@{comment.username}</Link>
            <p>{comment.content}</p>
            {(comment.user_id === user._id || user.is_admin) && (
              <button className="cursor-pointer text-xs text-danger hover:underline" onClick={() => handleDelete(comment._id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          className="input"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className="btn mt-2">Comment</button>
      </form>
    </section>
  );
}

export default Comments;
