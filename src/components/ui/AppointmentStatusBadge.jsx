export default function AppointmentStatusBadge({ status }) {
  const getAppointmentStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'text-blue-600 bg-blue-100';
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'canceled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const traduzirStatus = (status) => {
    switch (status) {
      case 'scheduled': return 'Agendada';
      case 'completed': return 'Concluída';
      case 'canceled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <p className={`inline-block mt-1 px-2 py-1 rounded ${getAppointmentStatusColor(status)}`}>
      {traduzirStatus(status)}
    </p>
  );
}
