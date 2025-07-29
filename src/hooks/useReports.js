import { useEffect, useState } from 'react';
import api from '../services/api';
import { 
  formatConsultationsByDay, 
  formatConsultationsByMonth, 
  formatDoctorStats, 
  filterByCurrentMonth 
} from '../utils/helpers';

export default function useReports(token) {
  const [reports, setReports] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/reports', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const filteredDataByDay = filterByCurrentMonth(data?.consultationsByDay);
        const processedDataByDay = formatConsultationsByDay(filteredDataByDay);
        const processedDataByMonth = formatConsultationsByMonth(data?.consultationsByMonth);
        const processedDoctorStats = formatDoctorStats(data?.doctorStats);

        setReports({
          ...data,
          consultationsByDay: processedDataByDay,
          consultationsByMonth: processedDataByMonth,
          doctorStats: processedDoctorStats
        });
        setError('');
      } catch (err) {
        setError('Erro ao carregar relatórios', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  return { reports, loading, error };
}
