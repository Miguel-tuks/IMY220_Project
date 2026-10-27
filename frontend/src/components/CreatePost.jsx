import { useState } from 'react';
import { apiRequest, parseHashtags } from '../api';
import ImageInput from './ImageInput';

function CreatePost({ user, onCreated }) {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    try {
      await apiRequest('/posts', 'POST', {
        user_id: user._id,
        image_url: image,
        description,
        hashtags: parseHashtags(hashtags)
      });
      form.reset();
      setImage('');
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
        <ImageInput id="new-shot-image" label="Image" value={image} onChange={setImage} required />
        <div>
          <label htmlFor="new-shot-hashtags" className="label">Hashtags</label>
          <input id="new-shot-hashtags" className="input" type="text" placeholder="#portra400 #street" value={hashtags} onChange={(e) => setHashtags(e.target.value)} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="new-shot-description" className="label">Description</label>
          <textarea id="new-shot-description" className="input" value={description} onChange={(e) => setDescription(e.target.value)} required />
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