import { useEffect, useState } from 'react';
import { apiRequest } from '../api';
import SearchInput from '../components/SearchInput';
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

  const tabClass = (type) => (feedType === type ? 'btn' : 'btn-outline');

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{feedType === 'local' ? 'Friends Feed' : 'Global Feed'}</h1>
          <div className="flex gap-2">
            <button className={tabClass('local')} onClick={() => setFeedType('local')}>Local</button>
            <button className={tabClass('global')} onClick={() => setFeedType('global')}>Global</button>
          </div>
        </div>
        <p className="error">{error}</p>
        <Feed
          posts={feed.posts}
          albums={feed.albums}
          emptyMessage={feedType === 'local' ? 'Add some friends to see their posts here.' : 'No posts yet.'}
        />
      </section>
      <aside>
        <SearchInput />
      </aside>
    </div>
  );
}

export default HomePage;
