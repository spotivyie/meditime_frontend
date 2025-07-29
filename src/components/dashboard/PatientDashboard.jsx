import PatientAppointmentsSummary from '../patient/PatientAppointmentsSummary';
import PatientUpcomingAppointments from '../patient/PatientUpcomingAppointments';
import RecentExamsPanel from '../patient/RecentExamsPanel';

export default function PatientDashboard() {
  return (
    <div>
      <PatientAppointmentsSummary />
      <PatientUpcomingAppointments/>
      <RecentExamsPanel/>
    </div>
  );
}
