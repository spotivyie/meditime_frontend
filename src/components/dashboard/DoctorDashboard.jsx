import DashboardAppointments from "../doctor/DoctorDashboardToday";
import PatientAppointmentsSummary from "../patient/PatientAppointmentsSummary";

export default function DoctorDashboard() {
  return (
    <div>
      <PatientAppointmentsSummary/>
      <DashboardAppointments role="doctor" />
    </div>
  );
}
