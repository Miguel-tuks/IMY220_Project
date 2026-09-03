import { useState } from 'react';

function EditProfile({ profile }) {
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label>Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

        <button type="submit">Save</button>
      </form>
    </section>
  );
}

export default EditProfile;