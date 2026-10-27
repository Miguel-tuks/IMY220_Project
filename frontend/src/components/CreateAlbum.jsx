import { useState } from 'react';
import { apiRequest, parseHashtags } from '../api';

function CreateAlbum({ user, onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiRequest('/albums', 'POST', {
        user_id: user._id,
        name,
        description,
        hashtags: parseHashtags(hashtags)
      });
      setName('');
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
      <h2 className="text-2xl">New roll</h2>
      <form onSubmit={handleSubmit} className="grid gap-x-6 md:grid-cols-2">
        <div>
          <label htmlFor="new-roll-name" className="label">Name</label>
          <input id="new-roll-name" className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="new-roll-hashtags" className="label">Hashtags</label>
          <input id="new-roll-hashtags" className="input" type="text" placeholder="#coastal #winter" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="new-roll-description" className="label">Description</label>
          <textarea id="new-roll-description" className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <p className="error">{error}</p>
          <button type="submit" className="btn mt-2">Create roll</button>
        </div>
      </form>
    </section>
  );
}

export default CreateAlbum;