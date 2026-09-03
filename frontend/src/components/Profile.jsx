function Profile({ profile }) {
  return (
    <section>
      <img src={profile.profile_image} alt={profile.username} />
      <h1>{profile.username}</h1>
      <p>{profile.bio}</p>
    </section>
  );
}

export default Profile;