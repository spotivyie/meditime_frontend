import PatientAppointmentsSummary from '../patient/PatientAppointmentsSummary';
import PatientUpcomingAppointments from '../Patient/PatientUpcomingAppointments';
import RecentExamsPanel from '../Patient/RecentExamsPanel';

export default function PatientDashboard() {
  return (
    <div>
      <PatientAppointmentsSummary />
      <PatientUpcomingAppointments/>
      <RecentExamsPanel/>
    </div>
  );
}
