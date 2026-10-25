import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiRequest } from '../api';
import ProfilePreview from '../components/ProfilePreview';
import PostList from '../components/PostList';
import AlbumList from '../components/AlbumList';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState(null);

  useEffect(() => {
    apiRequest('/search?q=' + encodeURIComponent(query)).then((data) => setResults(data));
  }, [query]);

  if (!results) {
    return <p className="text-paper/60">Searching...</p>;
  }

  const total = results.users.length + results.posts.length + results.albums.length;

  return (
    <div className="space-y-8">
      <div>
        <p className="meta">Search results for</p>
        <h1 className="mt-2 text-5xl">{query}</h1>
        {total === 0 && <p className="mt-3 text-paper/60">Nothing matched your search. Try a different word or #tag.</p>}
      </div>

      {results.users.length > 0 && (
        <section className="card">
          <h2 className="mb-3 text-2xl">People</h2>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {results.users.map((profile) => (
              <ProfilePreview key={profile._id} profile={profile} />
            ))}
          </div>
        </section>
      )}

      {results.posts.length > 0 && (
        <section>
          <h2 className="mb-3 text-2xl">Shots</h2>
          <PostList posts={results.posts} />
        </section>
      )}

      {results.albums.length > 0 && (
        <section>
          <h2 className="mb-3 text-2xl">Rolls</h2>
          <AlbumList albums={results.albums} />
        </section>
      )}
    </div>
  );
}

export default SearchPage;