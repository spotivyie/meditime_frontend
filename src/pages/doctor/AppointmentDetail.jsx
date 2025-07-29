import { useParams } from 'react-router-dom';
import EmptyState from '../../components/ui/EmptyState';
import ErrorMessage from '../../components/ui/ErrorMessage';
import useAppointment from '../../hooks/useAppointment';
import SectionTitle from '../../components/ui/SectionTitle';

const statusTexts = {
  scheduled: 'Agendada',
  completed: 'Concluída',
  canceled: 'Cancelada',
};

export default function AppointmentDetail() {
  const { id } = useParams();
  const { appointment, loading, error } = useAppointment(id);

  if (loading) return <EmptyState message="Carregando detalhe do agendamento..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!appointment) return <EmptyState message="Agendamento não encontrado" />;

  const statusText = statusTexts[appointment.status] || 'Desconhecido';

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-xl shadow-lg">
        <SectionTitle className='border-b border-gray-700 text-center pb-3'>Detalhe do Agendamento</SectionTitle>

        <div className="space-y-6">
          <div className="flex justify-between items-start space-x-12">
            <div className="flex-1">
              <h3 className="text-lg font-medium">Paciente</h3>
              <p>{appointment.patient.name}</p>
              <p className="text-sm text-gray-400">{appointment.patient.email}</p>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-medium">Médico</h3>
              <p>{appointment.doctor.name}</p>
              <p className="text-sm text-gray-400">{appointment.doctor.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Data e Hora</h3>
            <p>{new Date(appointment.date).toLocaleString('pt-BR')}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Status</h3>
            <span className={`text-xl font-semibold ${appointment.status === 'canceled' ? 'text-red-500' : 'text-green-500'}`}>{statusText}</span>
          </div>

          {appointment.notes && (
            <div>
              <h3 className="text-lg font-medium">Observações</h3>
              <p className="italic">{appointment.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
