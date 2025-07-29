export default function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'text-yellow-600 bg-yellow-100';
      case 'realizado': return 'text-blue-600 bg-blue-100';
      case 'entregue': return 'text-green-600 bg-green-100';
      case 'scheduled': return 'text-blue-700 bg-blue-100';
      case 'completed': return 'text-green-700 bg-green-100';
      case 'canceled': return 'text-red-700 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pendente': return 'Pendente';
      case 'realizado': return 'Realizado';
      case 'entregue': return 'Disponível';
      case 'scheduled': return 'Agendada';
      case 'completed': return 'Concluída';
      case 'canceled': return 'Cancelada';
    }
  };

  return (
    <p className={`inline-block px-3 py-1 rounded ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </p>
  );
}
