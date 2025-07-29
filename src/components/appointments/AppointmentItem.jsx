import { useNavigate } from 'react-router-dom';
//components
import AppointmentStatusBadge from '../ui/AppointmentStatusBadge';
import UserActions from '../ui/UserActions';

export default function AppointmentItem({
  app,
  userType,
  onEdit,
  onCancel,
  onComplete,
  formatDate,
}) {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-xl space-y-2 bg-gray-900">
      <div className="md:flex justify-between items-center">
        <div>
          <p className="font-semibold">Paciente: {app.patient.name}</p>
          <p className="font-semibold">Doutor: {app.doctor.name}</p>
          <p className="mt-2">{formatDate(app.date)}</p>
          <AppointmentStatusBadge status={app.status} />
          {userType === 'admin' && (
            <button
              onClick={() => navigate(`/appointment/${app._id}`)}
              className="inline-block mt-6 px-2 py-1 rounded hover:underline"
            >
              Ver Detalhes
            </button>
          )}
        </div>
        {app.status === 'scheduled' && (
            <UserActions
              onEdit={onEdit}
              onCancel={onCancel}
              onComplete={onComplete}
              userType={userType} 
              status={app.status}
              variant="default"
          />
        )}
      </div>
    </div>
  );
}
