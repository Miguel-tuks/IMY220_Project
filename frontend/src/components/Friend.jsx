import ProfilePreview from './ProfilePreview';

function Friend({ friends }) {
  return (
    <section className="card">
      <p className="label mt-0">Contacts</p>
      {friends.length === 0 && <p className="text-sm text-paper/60">No contacts yet.</p>}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {friends.map((friend) => (
          <ProfilePreview key={friend._id} profile={friend} />
        ))}
      </div>
    </section>
  );
}

export default Friend;
