import { useState } from 'react';
import { apiRequest, parseHashtags } from '../api';

function EditPost({ post, onSaved }) {
  const [description, setDescription] = useState(post.description);
  const [hashtags, setHashtags] = useState(post.hashtags.map((tag) => '#' + tag).join(' '));
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiRequest('/posts/' + post._id, 'PUT', {
        description,
        hashtags: parseHashtags(hashtags)
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <h2 className="text-2xl">Edit shot</h2>
      <form onSubmit={handleSubmit}>
        <label className="label">Description</label>
        <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} required />

        <label className="label">Hashtags</label>
        <input className="input" type="text" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />

        <p className="error">{error}</p>
        <button type="submit" className="btn mt-2">Save</button>
      </form>
    </section>
  );
}

export default EditPost;
