import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate('/search?q=' + encodeURIComponent(searchTerm.trim()));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 md:max-w-sm">
      <label htmlFor="site-search" className="meta">Search</label>
      <input
        id="site-search"
        className="input"
        type="search"
        placeholder="People, shots, rolls or #tags"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}

export default SearchInput;