import { useState } from 'react';

function CreatePost() {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Caption</label>
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} required />

        <label>Image URL</label>
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

        <button type="submit">Post</button>
      </form>
    </section>
  );
}

export default CreatePost;