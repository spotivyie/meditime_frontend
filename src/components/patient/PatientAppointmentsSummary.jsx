//hoooks
import usePatientAppointments from '../../hooks/usePatientAppointments';
//components
import SectionTitle from '../ui/SectionTitle';
import EmptyState from '../ui/EmptyState';
import ErrorMessage from '../ui/ErrorMessage';
import ConsultaCard from '../ui/ConsultaCard';
//icons
import { CalendarDays, Hourglass, Ban } from 'lucide-react';

export default function PatientAppointmentsSummary() {
  const { appointments, loading, error } = usePatientAppointments();
  const now = new Date();

  const agendados = appointments.filter(appt => {
    const apptDate = new Date(appt.date);
    return (appt.status === 'scheduled' || appt.status === 'completed') && apptDate < now;
  });

  const pendentes = appointments.filter(appt => {
    const apptDate = new Date(appt.date);
    return (appt.status === 'scheduled' || appt.status === 'pending') && apptDate >= now;
  });

  const cancelados = appointments.filter(appt => appt.status === 'canceled');

  return (
    <div>
      <SectionTitle>Consultas</SectionTitle>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <ConsultaCard
          icon={CalendarDays}
          color="yellow"
          count={agendados.length}
          title="Consultas finalizadas"
        />
        <ConsultaCard
          icon={Hourglass}
          color="blue"
          count={pendentes.length}
          title="Consultas pendentes"
        />
        <ConsultaCard
          icon={Ban}
          color="red"
          count={cancelados.length}
          title="Consultas canceladas"
        />
      </div>

      {loading && <EmptyState message="Carregando..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && appointments.length === 0 && (
        <EmptyState message="Você não possui consultas." />
      )}
    </div>
  );
}
