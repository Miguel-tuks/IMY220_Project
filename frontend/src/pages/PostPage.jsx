import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Post from '../components/Post';
import EditPost from '../components/EditPost';

const postData = {
  post_id: 1,
  user_id: 1,
  username: 'dummy_user',
  caption: 'Sunset at the dam',
  description: 'Took this on the way home after class.',
  image_url: 'https://picsum.photos/id/1015/300/200',
  comments: [
    { comment_id: 1, username: 'john_s', content: 'This looks amazing.' },
    { comment_id: 2, username: 'alex_s', content: 'Which camera?' }
  ]
};

function PostPage() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <main>
        <p>Post ID: {id}</p>
        <Post post={postData} />
        <EditPost post={postData} />
      </main>
    </>
  );
}

export default PostPage;