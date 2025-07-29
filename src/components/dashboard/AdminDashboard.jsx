import DashboardAppointments from '../doctor/DoctorDashboardToday';
import PatientAppointmentsSummary from '../patient/PatientAppointmentsSummary';

export default function AdminDashboard() {
  return (
    <div>
      <PatientAppointmentsSummary/>
      <DashboardAppointments role="admin" />
    </div>
  );
}
