import { useState } from 'react';
import { apiRequest, parseHashtags } from '../api';

function CreatePost({ user, onCreated }) {
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiRequest('/posts', 'POST', {
        user_id: user._id,
        image_url: imageUrl,
        description,
        hashtags: parseHashtags(hashtags)
      });
      setImageUrl('');
      setDescription('');
      setHashtags('');
      setError('');
      onCreated();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <h2 className="text-2xl">New shot</h2>
      <form onSubmit={handleSubmit} className="grid gap-x-6 md:grid-cols-2">
        <div>
          <label className="label">Image URL</label>
          <input className="input" type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        </div>
        <div>
          <label className="label">Hashtags</label>
          <input className="input" type="text" placeholder="#portra400 #street" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <p className="error">{error}</p>
          <button type="submit" className="btn mt-2">Post shot</button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;
