import ProfilePreview from './ProfilePreview';

function FriendRequests({ requests, onAccept }) {
  return (
    <section className="card">
      <h2 className="text-xl font-bold">Friend Requests</h2>
      {requests.length === 0 && <p className="mt-2 text-sm text-muted">No pending requests.</p>}
      <div className="mt-3 space-y-2">
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
