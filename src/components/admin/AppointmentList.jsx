import React from 'react';
//components
import EmptyState from '../ui/EmptyState';
import AppointmentStatusBadge from '../ui/AppointmentStatusBadge';

export default function AppointmentList({ appointments }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Agendamentos:</h3>
      {appointments.length === 0 ? (
        <EmptyState message="Esse paciente não possui agendamentos." />
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map(appt => (
            <li key={appt._id} className="p-4 border border-gray-600 bg-gray-900 rounded shadow">
              <p><strong>Médico:</strong> {appt.doctor?.name}</p>
              <p><strong>Data:</strong> {new Date(appt.date).toLocaleString()}</p>
              <AppointmentStatusBadge status={appt.status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
