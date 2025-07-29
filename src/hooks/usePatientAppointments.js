import { useEffect, useState } from 'react';
import api from '../services/api';

export default function usePatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get('/my-appointments', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        setAppointments(sorted);
      } catch (err) {
        setError('Erro ao carregar suas consultas', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  return { appointments, loading, error };
}
