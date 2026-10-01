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
      <h2 className="text-xl font-bold">Create Album</h2>
      <form onSubmit={handleSubmit}>
        <label className="label">Name</label>
        <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="label">Description</label>
        <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label className="label">Hashtags</label>
        <input className="input" type="text" placeholder="#holiday #family" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />

        <p className="error">{error}</p>
        <button type="submit" className="btn mt-2">Create Album</button>
      </form>
    </section>
  );
}

export default CreateAlbum;
