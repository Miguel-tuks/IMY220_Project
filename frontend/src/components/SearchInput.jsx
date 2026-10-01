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

  const closeResults = () => {
    setResults([]);
    setSearched(false);
    setSearchTerm('');
  };

  return (
    <div className="relative md:max-w-sm">
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="search"
          placeholder="Search people, then press Enter"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searched && (
        <div className="card absolute top-full right-0 left-0 z-10 mt-2 space-y-1 p-3" onClick={closeResults}>
          {results.length === 0 && <p className="text-sm text-paper/60">No people found.</p>}
          {results.map((result) => (
            <ProfilePreview key={result._id} profile={result} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
