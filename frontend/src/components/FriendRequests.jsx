import ProfilePreview from './ProfilePreview';

function FriendRequests({ requests, onAccept }) {
  return (
    <section className="card">
      <p className="label mt-0">Contact requests</p>
      {requests.length === 0 && <p className="text-sm text-paper/60">No pending requests.</p>}
      <div className="space-y-2">
        {requests.map((request) => (
          <div key={request._id} className="flex items-center justify-between">
            <ProfilePreview profile={request} />
            <button className="btn" onClick={() => onAccept(request._id)}>Accept</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FriendRequests;
