import { useNavigate } from 'react-router-dom';
//hooks
import usePagination from '../../hooks/usePagination';
//components
import StatusBadge from '../ui/StatusBadge';
import PaginationControls from '../ui/PaginationControls'; 
//icons
import { Eye, XCircle } from 'lucide-react';

export default function PaginatedAppointments({ appointments, onCancel }) {
  const navigate = useNavigate();

  const {
    page,
    totalPages,
    currentPageItems,
    handlePrev,
    handleNext,
    setPageNumber, 
  } = usePagination(appointments, 10);

  return (
    <div className='pt-4'>
      <div className="border border-gray-700 rounded overflow-hidden">
        <div className="hidden md:grid grid-cols-12 bg-gray-800 text-gray-400 uppercase text-xs font-semibold px-4 py-3">
          <div className="col-span-3">Paciente</div>
          <div className="col-span-3">Data</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-3">Doutor</div>
          <div className="col-span-1 text-right">Ações</div>
        </div>

        {currentPageItems.map((app) => {
          const date = new Date(app.date);
          const formattedDate = date.toLocaleDateString('pt-BR', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });

          const patientInitials = app.patient.name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

          return (
            <div
              key={app._id}
              className="grid grid-cols-1 bg-gray-900 md:grid-cols-12 gap-2 md:gap-0 border-t border-gray-700 px-4 py-3 items-center hover:bg-gray-800 transition"
            >
              <div className="col-span-1 md:col-span-3 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-semibold">
                  {patientInitials}
                </div>
                <span>{app.patient.name}</span>
              </div>

              <div className="col-span-1 md:col-span-3 text-gray-300">
                {formattedDate}
              </div>

              <div className="col-span-1 md:col-span-2">
                <StatusBadge status={app.status} />
              </div>

              <div className="col-span-1 md:col-span-3 text-gray-300">
                {app.doctor?.name || '---'}
              </div>

              <div className="col-span-1 md:col-span-1 flex xl:justify-end space-x-4">
                <button
                  onClick={() => navigate(`/appointment/${app._id}`)}
                  className="text-green-400 hover:text-green-500 transition"
                  aria-label="Ver detalhes"
                >
                  <Eye size={20} />
                </button>
                <button
                  onClick={() => onCancel(app._id)}
                  className="text-red-500 hover:text-red-600 transition"
                  aria-label="Cancelar consulta"
                >
                  <XCircle size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {appointments.length > 10 && (
        <PaginationControls
          page={page}
          totalPages={totalPages}
          handlePrev={handlePrev}
          handleNext={handleNext}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
}
