import { useState } from 'react';

function EditPost({ post }) {
  const [caption, setCaption] = useState(post.caption);
  const [description, setDescription] = useState(post.description);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Caption</label>
        <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} required />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit">Save</button>
      </form>
    </section>
  );
}

export default EditPost;