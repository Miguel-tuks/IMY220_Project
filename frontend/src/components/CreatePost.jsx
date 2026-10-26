import { useState } from 'react';
import { apiRequest, parseHashtags } from '../api';

function CreatePost({ user, onCreated }) {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [error, setError] = useState('');

  const handleImage = (event) => {
    const file = event.target.files[0];
    setImage('');
    setError('');

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be smaller than 2 MB');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

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
        <div>
          <label htmlFor="new-shot-image" className="label">Image</label>
          <input
            id="new-shot-image"
            className="input file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-safelight file:px-3 file:py-1.5 file:font-mono file:text-xs file:uppercase file:tracking-[0.15em] file:text-paper"
            type="file"
            accept="image/*"
            onChange={handleImage}
            required
          />
          {image && <img src={image} alt="Preview of the new shot" className="mt-3 aspect-video w-full border border-edge object-cover" />}
        </div>
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