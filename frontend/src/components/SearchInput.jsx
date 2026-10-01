import { useState } from 'react';
import { apiRequest } from '../api';
import ProfilePreview from './ProfilePreview';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await apiRequest('/users?search=' + encodeURIComponent(searchTerm));
    setResults(data);
    setSearched(true);
  };

  return (
    <section className="card">
      <h2 className="text-xl font-bold">Find people</h2>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          className="input"
          type="search"
          placeholder="Search usernames"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="btn">Go</button>
      </form>
      <div className="mt-3 space-y-2">
        {searched && results.length === 0 && <p className="text-sm text-muted">No users found.</p>}
        {results.map((result) => (
          <ProfilePreview key={result._id} profile={result} />
        ))}
      </div>
    </section>
  );
}

export default SearchInput;
