import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//services
import api from '../services/api';
//components
import AdminDashboard from '../components/dashboard/AdminDashboard';
import DoctorDashboard from '../components/dashboard/DoctorDashboard';
import PatientDashboard from '../components/dashboard/PatientDashboard';
import EmptyState from '../components/ui/EmptyState';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get('/auth/me', {
          withCredentials: true, 
        });
        setUser(data);
      } catch (err) {
        navigate('/login', err);
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <EmptyState message="Carregando..." />
      </div>
    );
  }

  const renderRoleDashboard = () => {
    switch (user.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'patient':
        return <PatientDashboard />;
      default:
        return <EmptyState message={`Função não reconhecida: ${user.role}`} />;
    }
  };

  return (
    <div>
      <div className="pt-6">
        {renderRoleDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
