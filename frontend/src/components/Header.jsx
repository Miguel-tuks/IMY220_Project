import { Link, useNavigate } from 'react-router-dom';
import { apiRequest } from '../api';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiRequest('/signout', 'POST');
    onLogout();
    navigate('/');
  };

  return (
    <header className="bg-ink text-paper">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/home" className="font-display text-2xl font-bold text-paper">
          Grail
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link to="/home" className="hover:text-film">Home</Link>
          <Link to={'/profile/' + user._id} className="hover:text-film">Profile</Link>
          {user.is_admin && <Link to="/admin" className="hover:text-film">Admin</Link>}
          <button onClick={handleLogout} className="btn">Log out</button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
