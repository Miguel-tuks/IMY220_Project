import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';
import Logo from './Logo';
import Avatar from './Avatar';
import SearchInput from './SearchInput';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiRequest('/signout', 'POST');
    onLogout();
    navigate('/');
  };

  return (
    <header className="border-b border-edge bg-ink">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center gap-4 px-4 py-4 md:flex-nowrap md:gap-8">
        <Link to="/home">
          <Logo />
        </Link>
        <div className="order-last w-full md:order-none md:w-auto md:flex-1">
          <SearchInput />
        </div>
        <div className="ml-auto flex items-center gap-4 text-sm">
          <Link to="/home" className="hover:text-wash">Home</Link>
          <Link to={'/profile/' + user._id} className="btn-outline">+ New shot</Link>
          {user.is_admin && <Link to="/admin" className="hover:text-wash">Admin</Link>}
          <Link to={'/profile/' + user._id}>
            <Avatar name={user.username} image={user.profile_image} />
          </Link>
          <button onClick={handleLogout} className="cursor-pointer hover:text-wash">Log out</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
