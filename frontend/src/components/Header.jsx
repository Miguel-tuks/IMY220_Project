import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/profile/1">Profile</Link>
        <Link to="/post/1">Post</Link>
        <Link to="/">Log out</Link>
      </nav>
    </header>
  );
}

export default Header;