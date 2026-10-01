import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';
import Avatar from '../components/Avatar';
import Feed from '../components/Feed';

function HomePage({ user }) {
  const [feedType, setFeedType] = useState('local');
  const [feed, setFeed] = useState({ posts: [], albums: [] });
  const [error, setError] = useState('');

  useEffect(() => {
    const path = feedType === 'local' ? '/feed/local/' + user._id : '/feed/global';
    apiRequest(path)
      .then((data) => setFeed(data))
      .catch((err) => setError(err.message));
  }, [feedType, user._id]);

  const tabClass = (type) => (feedType === type ? 'tab tab-active' : 'tab');

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <section>
        <div className="mb-6 flex">
          <button className={tabClass('local')} onClick={() => setFeedType('local')}>Contacts</button>
          <button className={tabClass('global')} onClick={() => setFeedType('global')}>Everyone</button>
        </div>
        <p className="error">{error}</p>
        <Feed
          posts={feed.posts}
          albums={feed.albums}
          layout={feedType === 'local' ? 'list' : 'grid'}
          emptyMessage={feedType === 'local' ? 'Add some contacts to see their shots and rolls here.' : 'Nothing on Grain yet.'}
        />
      </section>

      <aside>
        <section className="card flex flex-col items-center text-center">
          <Avatar name={user.username} image={user.profile_image} size="h-20 w-20" />
          <p className="mt-3 font-bold">{user.username}</p>
          <p className="meta">@{user.username}</p>
          <Link to={'/profile/' + user._id} className="btn-outline mt-4">View profile</Link>
        </section>
      </aside>
    </div>
  );
}

export default HomePage;
