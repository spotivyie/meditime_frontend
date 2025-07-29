//components
import SectionTitle from '../ui/SectionTitle';
import usePatientAppointments from '../../hooks/usePatientAppointments';
import WrapperCard from '../ui/WrapperCard';
import ErrorMessage from '../ui/ErrorMessage';
import EmptyState from '../ui/EmptyState';
import AppointmentCard from '../ui/AppointmentCard';
//icons
import { Calendar, Clock, User } from 'lucide-react'; 

export default function PatientUpcomingAppointments() {
  const { appointments, loading, error } = usePatientAppointments();
  const now = new Date();

  const pendentes = appointments.filter(appt => {
    const apptDate = new Date(appt.date);
    const isScheduledOrPending = appt.status === 'scheduled' || appt.status === 'pending';
    const isFutureOrCurrentDate = apptDate >= now;

    return isScheduledOrPending && isFutureOrCurrentDate;
  });

  return (
    <WrapperCard>
      <SectionTitle>Próximas Consultas</SectionTitle>

      {loading && <EmptyState message="Carregando..." />}
      {error && <ErrorMessage message={error} />}
      {!loading && pendentes.length === 0 && (
        <EmptyState message="Você não possui consultas." />
      )}

      {pendentes.length > 0 && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pendentes.map((appt) => {
            return (
              <div
                key={appt._id}
                className="bg-gray-900 text-white rounded-xl shadow-lg py-6 px-4 space-y-4 hover:bg-gray-700 transition-colors"
              >
                <AppointmentCard
                  icon={User}
                  color="green"
                  label="Médico"
                  value={`Dr. ${appt.doctor?.name || '---'}`}
                />
                <AppointmentCard
                  icon={Calendar}
                  color="blue"
                  label="Data"
                  value={new Date(appt.date).toLocaleDateString('pt-BR')}
                />
                <AppointmentCard
                  icon={Clock}
                  color="yellow"
                  label="Hora"
                  value={new Date(appt.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                />
              </div>
            );
          })}
        </div>
      )}
    </WrapperCard>
  );
}
