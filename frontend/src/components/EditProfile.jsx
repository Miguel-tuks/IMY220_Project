import { useState } from 'react';
import { apiRequest } from '../api';

function EditProfile({ profile, onSaved }) {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [bio, setBio] = useState(profile.bio);
  const [profileImage, setProfileImage] = useState(profile.profile_image);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    try {
      const updatedUser = await apiRequest('/users/' + profile._id, 'PUT', {
        username,
        email,
        bio,
        profile_image: profileImage
      });
      onSaved(updatedUser);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label className="label">Username</label>
        <input className="input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label className="label">Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className="label">Bio</label>
        <textarea className="input" value={bio} onChange={(e) => setBio(e.target.value)} />

        <label className="label">Profile image URL</label>
        <input className="input" type="url" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />

        <p className="error">{error}</p>
        <button type="submit" className="btn mt-2">Save</button>
      </form>
    </section>
  );
}

export default EditProfile;
