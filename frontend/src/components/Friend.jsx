import ProfilePreview from './ProfilePreview';

function Friend({ friends }) {
  return (
    <section className="card">
      <h2 className="text-xl font-bold">Friends</h2>
      {friends.length === 0 && <p className="mt-2 text-sm text-muted">No friends yet.</p>}
      <div className="mt-3 space-y-2">
        {friends.map((friend) => (
          <ProfilePreview key={friend._id} profile={friend} />
        ))}
      </div>
    </section>
  );
}

export default Friend;
