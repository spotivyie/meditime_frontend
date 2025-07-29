import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// services
import api from '../../services/api';
// user
import UserProfile from '../user/UserProfile';
// navigations
import RoleNavigation from '../navigation/RoleNavigation';
// components
import EmptyState from '../ui/EmptyState';
// images
import logo from '../../assets/meditime.png';

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginOrRegisterPage = location.pathname === '/login' || location.pathname === '/register';

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const { data } = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
      } catch (err) {
        navigate('/login', err);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true }); 
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    }
    navigate('/login');
  };

  if (isLoginOrRegisterPage) {
    return <Outlet />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <EmptyState message="Carregando..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-800 text-white">
      <header className="shadow py-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
          <Link to="/dashboard">
            <img src={logo} alt="Logo Meditime" className="h-16 cursor-pointer" />
          </Link>
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <RoleNavigation />
          </div>
          <UserProfile user={user} handleLogout={handleLogout} />
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
