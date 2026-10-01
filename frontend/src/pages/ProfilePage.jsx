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

  const friendAction = async (path, method, body) => {
    await apiRequest(path, method, body);
    loadProfile();
  };

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
      setUser(null);
    } else {
      navigate('/home');
    }
  };

  return (
    <div className="space-y-6">
      <Profile profile={profile} shotCount={posts.length} rollCount={albums.length}>
        {!isOwnProfile && isFriend && (
          <button className="btn-outline" onClick={() => friendAction('/users/' + user._id + '/friends/' + id, 'DELETE')}>
            Remove contact
          </button>
        )}
        {!isOwnProfile && !isFriend && requestSent && (
          <button className="btn-outline opacity-60" disabled>Request sent</button>
        )}
        {!isOwnProfile && !isFriend && !requestSent && (
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
            <FriendRequests
              requests={profile.friend_requests}
              onAccept={(requestId) => friendAction('/users/' + user._id + '/friends', 'POST', { friend_id: requestId })}
            />
          )}
          <Friend friends={profile.friends} />
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
