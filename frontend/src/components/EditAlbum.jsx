import { useState } from 'react';
import { apiRequest, parseHashtags } from '../api';

function EditAlbum({ album, onSaved }) {
  const [name, setName] = useState(album.name);
  const [description, setDescription] = useState(album.description);
  const [hashtags, setHashtags] = useState(album.hashtags.map((tag) => '#' + tag).join(' '));
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await apiRequest('/albums/' + album._id, 'PUT', {
        name,
        description,
        hashtags: parseHashtags(hashtags)
      });
      onSaved();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card mb-8">
      <h2 className="text-2xl">Edit roll</h2>
      <form onSubmit={handleSubmit} className="grid gap-x-6 md:grid-cols-2">
        <div>
          <label className="label">Name</label>
          <input className="input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="label">Hashtags</label>
          <input className="input" type="text" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea className="input" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <p className="error">{error}</p>
          <button type="submit" className="btn mt-2">Save</button>
        </div>
      </form>
    </section>
  );
}

export default EditAlbum;
