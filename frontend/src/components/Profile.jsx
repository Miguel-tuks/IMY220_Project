function Profile({ profile, children }) {
  return (
    <section className="card text-center">
      <img
        src={profile.profile_image}
        alt={profile.username}
        className="mx-auto h-28 w-28 rounded-full border-4 border-paper bg-line object-cover"
      />
      <h1 className="mt-3 text-3xl font-bold">@{profile.username}</h1>
      {profile.is_admin && <p className="text-sm font-medium text-film">Administrator</p>}
      <p className="mt-2 text-muted">{profile.bio}</p>
      <p className="mt-2 text-sm text-muted">{profile.friends.length} friends</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">{children}</div>
    </section>
  );
}

export default Profile;
