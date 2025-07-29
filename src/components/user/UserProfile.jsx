import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, UserCog } from 'lucide-react';
import RoleNavigation from '../navigation/RoleNavigation';

const UserProfile = ({ user, handleLogout }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleUpdateProfile = () => {
    navigate('/me/edit');
    setOpen(false);
  };

  const toggleDropdown = () => setOpen(!open);

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const imageUrl = baseUrl + user.photo;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex items-center space-x-2 cursor-pointer"
      >
        {user.photo ? (
          <img
            src={imageUrl}
            alt={user.name}
            onError={(e) => {
              e.target.src = 'fallback-image.png';
            }}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xl">
            {user.name[0].toUpperCase()}
          </div>
        )}
        <h1 className="text-lg font-bold text-white">{user.name}</h1>
      </div>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 xl:w-44 bg-gray-800 shadow-lg rounded p-4 z-50 space-y-6">
          <div className="block lg:hidden">
            <RoleNavigation />
            <hr className="border-gray-700 my-2" />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="flex items-center w-full text-blue-400 hover:text-blue-300 transition"
          >
            <UserCog className="w-5 h-5 mr-2" /> Atualizar Perfil
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center w-full text-red-400 hover:text-red-300 transition"
          >
            <LogOut className="w-5 h-5 mr-2" /> Sair da conta
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
