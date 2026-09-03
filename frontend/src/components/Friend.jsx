import ProfilePreview from './ProfilePreview';

function Friend({ friends }) {
  return (
    <aside>
      <h2>Friends</h2>
      {friends.map((friend) => (
        <ProfilePreview key={friend.user_id} profile={friend} />
      ))}
    </aside>
  );
}

export default Friend;