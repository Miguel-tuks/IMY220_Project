import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import PostPage from './pages/PostPage';
import AlbumPage from './pages/AlbumPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const saveUser = (newUser) => {
    if (newUser) {
      localStorage.setItem('user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('user');
    }
    setUser(newUser);
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<SplashPage onLogin={saveUser} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <>
      <Header user={user} onLogout={() => saveUser(null)} />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/home" element={<HomePage user={user} />} />
          <Route path="/profile/:id" element={<ProfilePage user={user} setUser={saveUser} />} />
          <Route path="/post/:id" element={<PostPage user={user} />} />
          <Route path="/album/:id" element={<AlbumPage user={user} />} />
          {user.is_admin && <Route path="/admin" element={<AdminPage user={user} />} />}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
