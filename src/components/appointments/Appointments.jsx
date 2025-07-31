import { useEffect, useState } from 'react';
//services
import api from '../../services/api';
//hooks
import usePagination from '../../hooks/usePagination';
//appointments
import AppointmentItem from './AppointmentItem';
import AppointmentEdit from './AppointmentEdit';
//components
import WrapperCard from '../ui/WrapperCard';
import SectionTitle from '../ui/SectionTitle';
import { formatDate } from '../../utils/dateUtils';
import PaginationControls from '../ui/PaginationControls';
import Modal from '../ui/Modal'; 
import EmptyState from '../ui/EmptyState';
import ErrorMessage from '../ui/ErrorMessage';

export default function Appointments({ userType }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', hour: '', notes: '' });
  const [availableHours, setAvailableHours] = useState([]);
  const [loadingHours, setLoadingHours] = useState(false);

  const token = localStorage.getItem('token');

  const {
    page,
    totalPages,
    currentPageItems,
    handlePrev,
    handleNext,
    setPageNumber,
  } = usePagination(appointments, 10);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const url = userType === 'admin' ? '/all-appointments' : '/my-appointments';
      const { data } = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointments(sorted);
      setError('');
    } catch {
      setError('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableHours = async (doctorId, date) => {
    if (!doctorId || !date) return;
    setLoadingHours(true);
    try {
      const { data } = await api.get(`/availability?doctorId=${doctorId}&date=${date}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailableHours(data);
    } catch {
      setAvailableHours([]);
    } finally {
      setLoadingHours(false);
    }
  };

  const startEditing = (appt) => {
    setEditing(appt._id);
    setEditForm({
      date: appt.date.split('T')[0],
      hour: appt.date.slice(11, 16),
      notes: appt.notes || '',
    });
    fetchAvailableHours(appt.doctor._id, appt.date.split('T')[0]);
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Tem certeza que deseja cancelar esta consulta?')) return;
    try {
      await api.delete(`/appointments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Consulta cancelada com sucesso!');
      fetchAppointments();
    } catch {
      alert('Erro ao cancelar consulta');
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.put(
        `/appointments/${id}`,
        { status: 'completed' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Consulta marcada como concluída!');
      fetchAppointments();
    } catch {
      alert('Erro ao atualizar consulta');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'date' ? { hour: '' } : {}),
    }));

    if (name === 'date') {
      const appt = appointments.find((a) => a._id === editing);
      if (appt) fetchAvailableHours(appt.doctor._id, value);
    }
  };

  const handleSaveEdit = async (id) => {
    if (!editForm.date || !editForm.hour) {
      alert('Selecione data e horário');
      return;
    }

    try {
      const localDateTime = new Date(`${editForm.date}T${editForm.hour}`);
      const utcISOString = localDateTime.toISOString(); 

      await api.put(
        `/appointments/${id}`,
        {
          date: utcISOString, 
          notes: editForm.notes,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Consulta atualizada!');
      setEditing(null);
      setEditForm({ date: '', hour: '', notes: '' });
      setAvailableHours([]);
      fetchAppointments();
    } catch {
      alert('Erro ao atualizar consulta');
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({ date: '', hour: '', notes: '' });
    setAvailableHours([]);
  };

  return (
    <WrapperCard className="max-w-xl">
      <SectionTitle>
        {userType === 'admin' ? 'Agendamentos' : 'Minhas Consultas'}
      </SectionTitle>

      {loading ? (
        <EmptyState message="Carregando agendamentos..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : appointments.length === 0 ? (
        <EmptyState
          message={
            userType === 'admin'
              ? 'Nenhum agendamento.'
              : 'Nenhuma consulta agendada'
          }
        />
      ) : (
        <>
          {currentPageItems.map((appt) => (
            <AppointmentItem
              key={appt._id}
              app={appt}
              userType={userType}
              onEdit={() => startEditing(appt)}
              onCancel={() => handleCancel(appt._id)}
              onComplete={() => handleComplete(appt._id)}
              formatDate={formatDate}
            />
          ))}

          {appointments.length > 10 && (
            <PaginationControls
              page={page}
              totalPages={totalPages}
              handlePrev={handlePrev}
              handleNext={handleNext}
              setPageNumber={setPageNumber}
            />
          )}

          {editing && (
            <Modal onClose={cancelEdit}>
              <AppointmentEdit
                app={appointments.find((a) => a._id === editing)}
                editForm={editForm}
                setEditForm={setEditForm}
                availableHours={availableHours}
                loadingHours={loadingHours}
                onChange={handleEditChange}
                onSave={() => handleSaveEdit(editing)}
                onCancel={cancelEdit}
              />
            </Modal>
          )}
        </>
      )}
    </WrapperCard>
  );
}
