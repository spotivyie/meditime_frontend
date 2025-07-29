import { useState, useEffect } from 'react';
import api from '../services/api';

const useAppointment = (id) => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/doctor-agenda/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAppointment(data);
      } catch {
        setError('Erro ao carregar o detalhe do agendamento');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  return { appointment, loading, error };
};

export default useAppointment;
