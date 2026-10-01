import Avatar from './Avatar';

function Profile({ profile, shotCount, rollCount, children }) {
  const stats = [
    { label: 'Shots', value: shotCount },
    { label: 'Rolls', value: rollCount },
    { label: 'Contacts', value: profile.friends.length }
  ];

  return (
    <section className="card flex flex-col gap-6 md:flex-row md:items-start">
      <Avatar name={profile.username} image={profile.profile_image} size="h-28 w-28" />
      <div className="flex-1">
        <h1 className="text-5xl">{profile.username}</h1>
        <p className="meta mt-1">
          @{profile.username}
          {profile.is_admin && ' · Administrator'}
        </p>
        <p className="mt-3 text-paper/80">{profile.bio}</p>
        <div className="mt-5 flex flex-wrap gap-2">{children}</div>
      </div>
      <div className="flex gap-8 border-edge md:flex-col md:gap-4 md:border-l md:pl-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-semibold">{stat.value}</p>
            <p className="meta">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Profile;
