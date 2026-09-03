import Header from '../components/Header';
import SearchInput from '../components/SearchInput';
import Feed from '../components/Feed';

const localPosts = [
  {
    post_id: 1,
    user_id: 1,
    username: 'dummy_user',
    caption: 'Sunset at the dam',
    image_url: 'https://picsum.photos/id/1015/300/200'
  },
  {
    post_id: 2,
    user_id: 2,
    username: 'jane_d',
    caption: 'Morning coffee',
    image_url: 'https://picsum.photos/id/1060/300/200'
  }
];

const globalPosts = [
  {
    post_id: 3,
    user_id: 3,
    username: 'john_s',
    caption: 'City lights',
    image_url: 'https://picsum.photos/id/1019/300/200'
  },
  {
    post_id: 4,
    user_id: 4,
    username: 'alex_s',
    caption: 'Mountain trail',
    image_url: 'https://picsum.photos/id/1036/300/200'
  }
];

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <SearchInput />
        <Feed title="Friends Feed" posts={localPosts} />
        <Feed title="Explore Feed" posts={globalPosts} />
      </main>
    </>
  );
}

export default HomePage;