import { useState } from 'react';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <input
      type="search"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchInput;