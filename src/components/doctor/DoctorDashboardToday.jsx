import { useEffect, useState } from 'react';
//services
import api from '../../services/api';
//components
import SectionTitle from '../ui/SectionTitle';
import WrapperCard from '../ui/WrapperCard';
import EmptyState from '../ui/EmptyState';
import ErrorMessage from '../ui/ErrorMessage';
//doctor
import PaginatedAppointments from './PaginatedAppointments';

export default function DashboardAppointments({ role }) {
  const [appointments, setAppointments] = useState([]);
  const [appointmentsToday, setAppointmentsToday] = useState([]);
  const [appointmentsNext, setAppointmentsNext] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const fetchAdminAppointments = async () => {
    try {
      const res = await api.get('/all-appointments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allAppointments = res.data || [];

      const today = new Date();
      const filtered = allAppointments.filter(app => {
        const appDate = new Date(app.date);
        return appDate >= today && app.status !== 'completed';
      });

      setAppointments(filtered);
      setError('');
    } catch {
      setError('Erro ao carregar agendamentos');
    }
  };

  const fetchDoctorAppointments = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]; 
      const [todayRes, nextRes] = await Promise.all([
        api.get(`/doctor-agenda?date=${today}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        api.get(`/doctor-agenda?range=next`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const filterValid = (list) => list.filter(app => app.status !== 'completed');
      setAppointmentsToday(filterValid(todayRes.data));  
      setAppointmentsNext(filterValid(nextRes.data));    

      setError('');
    } catch (err) {
      console.error("Erro ao carregar agendamentos do médico", err);
      setError('Erro ao carregar agenda');
    }
  };

  const fetchAppointments = async () => {
    setLoading(true);
    if (role === 'admin') {
      await fetchAdminAppointments();
    } else if (role === 'doctor') {
      await fetchDoctorAppointments();
    }
    setLoading(false);
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Tem certeza que deseja cancelar esta consulta?')) return;

    try {
      await api.delete(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Consulta cancelada com sucesso!');
      fetchAppointments();
    } catch {
      alert('Erro ao cancelar consulta');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [role]);

  if (loading) return <EmptyState message="Carregando agendamentos..." />;
  if (error) return <ErrorMessage message={error} />;

  if (role === 'admin') {
    return (
      <WrapperCard>
        <SectionTitle>Próximos Agendamentos</SectionTitle>
        {appointments.length > 0 ? (
          <PaginatedAppointments appointments={appointments} onCancel={handleCancel} />
        ) : (
          <EmptyState message="Nenhum agendamento encontrado." />
        )}
      </WrapperCard>
    );
  }

  if (role === 'doctor') {
    return (
      <div className="space-y-10 mx-auto">
        {appointmentsToday.length > 0 && (
          <div className=''>
            <SectionTitle>Agendamentos de Hoje</SectionTitle>
            <PaginatedAppointments appointments={appointmentsToday} onCancel={handleCancel} />
          </div>
        )}

        {appointmentsNext.length > 0 && (
          <div className='pt-8'>
            <SectionTitle>Próximos Agendamentos</SectionTitle>
            <PaginatedAppointments appointments={appointmentsNext} onCancel={handleCancel} />
          </div>
        )}

        {appointmentsToday.length === 0 && appointmentsNext.length === 0 && (
          <EmptyState message="Nenhum agendamento encontrado." />
        )}
      </div>
    );
  }

  return <EmptyState message="Perfil não suportado para agendamentos." />;
}
