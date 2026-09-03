import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Profile from '../components/Profile';
import EditProfile from '../components/EditProfile';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import Friend from '../components/Friend';

const profileData = {
  user_id: 1,
  username: 'dummy_user',
  bio: 'Takes too many photos.',
  profile_image: 'https://picsum.photos/id/1011/200/200'
};

const userPosts = [
  {
    post_id: 1,
    user_id: 1,
    username: 'dummy_user',
    caption: 'Sunset at the dam',
    image_url: 'https://picsum.photos/id/1015/300/200'
  },
  {
    post_id: 5,
    user_id: 1,
    username: 'dummy_user',
    caption: 'Study desk',
    image_url: 'https://picsum.photos/id/1074/300/200'
  }
];

const friends = [
  { user_id: 2, username: 'john_s' },
  { user_id: 3, username: 'alex_s' }
];

function ProfilePage() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <main>
        <p>Profile ID: {id}</p>
        <Profile profile={profileData} />
        <EditProfile profile={profileData} />
        <CreatePost />
        <PostList posts={userPosts} />
        <Friend friends={friends} />
      </main>
    </>
  );
}

export default ProfilePage;