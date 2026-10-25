import { useState } from 'react';
import { apiRequest } from '../api';

function EditProfile({ profile, onSaved }) {
  const [form, setForm] = useState({
    display_name: profile.display_name || '',
    username: profile.username,
    email: profile.email,
    pronouns: profile.pronouns || '',
    bio: profile.bio || '',
    social_link: profile.social_link || '',
    profile_image: profile.profile_image || ''
  });
  const [error, setError] = useState('');

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    try {
      const updatedUser = await apiRequest('/users/' + profile._id, 'PUT', form);
      onSaved(updatedUser);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="card">
      <h2 className="text-2xl">Edit profile</h2>
      <form onSubmit={handleSubmit} className="grid gap-x-6 md:grid-cols-2">
        <div>
          <label htmlFor="edit-display-name" className="label">Display name</label>
          <input id="edit-display-name" name="display_name" className="input" type="text" value={form.display_name} onChange={updateField} required />
        </div>
        <div>
          <label htmlFor="edit-username" className="label">Username</label>
          <input id="edit-username" name="username" className="input" type="text" value={form.username} onChange={updateField} required />
        </div>
        <div>
          <label htmlFor="edit-email" className="label">Email</label>
          <input id="edit-email" name="email" className="input" type="email" value={form.email} onChange={updateField} required />
        </div>
        <div>
          <label htmlFor="edit-pronouns" className="label">Pronouns</label>
          <input id="edit-pronouns" name="pronouns" className="input" type="text" placeholder="e.g. she/her" value={form.pronouns} onChange={updateField} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="edit-bio" className="label">Bio</label>
          <textarea id="edit-bio" name="bio" className="input" value={form.bio} onChange={updateField} />
        </div>
        <div>
          <label htmlFor="edit-social-link" className="label">Social link</label>
          <input id="edit-social-link" name="social_link" className="input" type="url" placeholder="https://" value={form.social_link} onChange={updateField} />
        </div>
        <div>
          <label htmlFor="edit-profile-image" className="label">Profile image URL</label>
          <input id="edit-profile-image" name="profile_image" className="input" type="url" value={form.profile_image} onChange={updateField} />
        </div>
        <div>
          <p className="error">{error}</p>
          <button type="submit" className="btn mt-2">Save</button>
        </div>
      </form>
    </section>
  );
}

export default EditProfile;