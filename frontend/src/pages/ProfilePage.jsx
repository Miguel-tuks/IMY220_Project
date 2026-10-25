import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import FriendRequests from '../components/FriendRequests';
import Friend from '../components/Friend';
import CreatePost from '../components/CreatePost';
import CreateAlbum from '../components/CreateAlbum';
import PostList from '../components/PostList';
import AlbumList from '../components/AlbumList';

function ProfilePage({ user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [myRequests, setMyRequests] = useState([]);
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [editing, setEditing] = useState(false);
  const [tab, setTab] = useState('shots');
  const [error, setError] = useState('');

  const isOwnProfile = user._id === id;
  const canEdit = isOwnProfile || user.is_admin;

  const loadProfile = () => {
    apiRequest('/users/' + id)
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
    apiRequest('/me').then((data) => setMyRequests(data.user ? data.user.friend_requests : []));
    apiRequest('/posts/user/' + id).then((data) => setPosts(data));
    apiRequest('/albums/user/' + id).then((data) => setAlbums(data));
  };

  useEffect(() => {
    loadProfile();
  }, [id]);

  if (!profile) {
    return <p className="text-paper/60">{error || 'Loading...'}</p>;
  }

  const isFriend = profile.friends.some((friend) => friend._id === user._id);
  const requestSent = profile.friend_requests.some((request) => request._id === user._id);
  const requestReceived = myRequests.includes(id);
  const canSeeAll = isOwnProfile || isFriend || user.is_admin;

  let status = 'Not connected';
  if (isFriend) status = 'Contacts';
  else if (requestReceived) status = 'Wants to connect with you';
  else if (requestSent) status = 'Request pending';

  const friendAction = async (path, method, body) => {
    await apiRequest(path, method, body);
    loadProfile();
  };

  const acceptRequest = (fromId) => friendAction('/users/' + user._id + '/friends', 'POST', { friend_id: fromId });
  const declineRequest = (fromId) => friendAction('/users/' + user._id + '/requests/' + fromId, 'DELETE');

  const handleSaved = (updatedUser) => {
    setEditing(false);
    if (isOwnProfile) {
      setUser({ ...user, ...updatedUser });
    }
    loadProfile();
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this account? This cannot be undone.')) {
      return;
    }

    await apiRequest('/users/' + id, 'DELETE');

    if (isOwnProfile) {
      await apiRequest('/signout', 'POST');
      setUser(null);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="space-y-6">
      <Profile profile={profile} shotCount={posts.length} rollCount={albums.length} showDetails={canSeeAll}>
        {!isOwnProfile && <p className="meta w-full">{status}</p>}
        {!isOwnProfile && isFriend && (
          <button className="btn-outline" onClick={() => friendAction('/users/' + user._id + '/friends/' + id, 'DELETE')}>
            Remove contact
          </button>
        )}
        {!isOwnProfile && !isFriend && requestReceived && (
          <>
            <button className="btn" onClick={() => acceptRequest(id)}>Accept</button>
            <button className="btn-outline" onClick={() => declineRequest(id)}>Decline</button>
          </>
        )}
        {!isOwnProfile && !isFriend && !requestReceived && !requestSent && (
          <button className="btn" onClick={() => friendAction('/users/' + id + '/requests', 'POST', { from_id: user._id })}>
            Add contact
          </button>
        )}
        {canEdit && (
          <button className="btn-outline" onClick={() => setEditing(!editing)}>
            {editing ? 'Cancel' : 'Edit profile'}
          </button>
        )}
        {canEdit && <button className="btn-danger" onClick={handleDelete}>Delete account</button>}
      </Profile>

      {editing && canEdit && <EditProfile key={profile._id} profile={profile} onSaved={handleSaved} />}

      {canSeeAll ? (
        <>
          <div className="flex">
            {['shots', 'rolls', 'contacts'].map((name) => (
              <button key={name} className={tab === name ? 'tab tab-active' : 'tab'} onClick={() => setTab(name)}>
                {name}
              </button>
            ))}
          </div>

          {tab === 'shots' && (
            <div className="space-y-6">
              {isOwnProfile && <CreatePost user={user} onCreated={loadProfile} />}
              <PostList posts={posts} />
            </div>
          )}

          {tab === 'rolls' && (
            <div className="space-y-6">
              {isOwnProfile && <CreateAlbum user={user} onCreated={loadProfile} />}
              <AlbumList albums={albums} />
            </div>
          )}

          {tab === 'contacts' && (
            <div className="space-y-6">
              {isOwnProfile && (
                <FriendRequests requests={profile.friend_requests} onAccept={acceptRequest} onDecline={declineRequest} />
              )}
              <Friend friends={profile.friends} />
            </div>
          )}
        </>
      ) : (
        <p className="card text-paper/60">Add @{profile.username} as a contact to see their shots, rolls and contacts.</p>
      )}
    </div>
  );
}

export default ProfilePage;