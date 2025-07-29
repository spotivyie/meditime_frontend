import { useEffect, useState } from 'react';
//services
import api from '../../services/api';
//components
import SectionTitle from '../ui/SectionTitle';
import WrapperCard from '../ui/WrapperCard';
import StatusBadge from '../ui/StatusBadge';
import ViewResultButton from '../ui/ViewResultButton';
import EmptyState from '../ui/EmptyState';
import ErrorMessage from '../ui/ErrorMessage';
import { parseJwt } from '../../utils/useJwt';
import AppointmentCard from '../ui/AppointmentCard';
//icons
import { Stethoscope, Calendar, User } from 'lucide-react';

export default function RecentExamsPanel() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const payload = parseJwt(token);
  const pacienteId = payload ? payload.userId || payload.id || null : null;

  useEffect(() => {
    if (pacienteId) {
      fetchExams();
    } else {
      setError('Paciente não identificado. Faça login novamente.');
      setLoading(false);
    }
  }, [pacienteId]);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/exames/${pacienteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar seus exames');
    } finally {
      setLoading(false);
    }
  };

  const recentExams = exams
    .filter((exam) => {
      if (!exam.dataSolicitacao) return false;
      const examDate = new Date(exam.dataSolicitacao);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return examDate >= oneWeekAgo;
    })
    .sort((a, b) => new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao));

  return (
    <WrapperCard>
      <SectionTitle>Exames Recentes</SectionTitle>

      {loading ? (
        <EmptyState message="Carregando exames..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : recentExams.length === 0 ? (
        <EmptyState message="Você não possui exames recentes cadastrados." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {recentExams.map((exam) => (
            <div key={exam._id} className="bg-gray-900 text-white rounded-xl shadow-lg py-6 px-4 space-y-4 hover:bg-gray-700 transition-colors">
              <AppointmentCard
                icon={Stethoscope}
                color="green"
                label="Exame"
                value={exam.tipoExame}
              />
              <AppointmentCard
                icon={User}
                color="blue"
                label="Médico"
                value={exam.doctorId?.name || 'Não informado'}
              />
              <AppointmentCard
                icon={Calendar}
                color="orange"
                label="Data"
                value={new Date(exam.dataSolicitacao).toLocaleDateString('pt-BR')}
              />
              <div className="flex justify-between items-center mt-4">
                <StatusBadge status={exam.status} />
                <ViewResultButton examId={exam._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </WrapperCard>
  );
}
