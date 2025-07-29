import { useState } from 'react';
//services
import api from '../../services/api';
//components
import ExamInput from '../ui/ExamInput';
import CloseButton from '../ui/CloseButton';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import UserFormModal from '../ui/UserFormModal';
import SectionTitle from '../ui/SectionTitle';

export default function DoctorExamStatus({ exameId, onCancel, onSuccess }) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    if (!status) {
      setError('Selecione um status.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.patch(
        `/exames/${exameId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (onSuccess) onSuccess();
    } catch {
      setError('Erro ao atualizar status. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserFormModal>
      <SectionTitle>Atualizar Status do Exame</SectionTitle>

      <div>
        <p className="text-gray-400 mb-2">
          <span className="font-medium text-gray-300">ID do Exame:</span> {exameId}
        </p>
      </div>

      <ExamInput
        label="Novo Status"
        select
        value={status}
        onChange={e => setStatus(e.target.value)}
        options={[
          { value: '', label: 'Selecione...' },
          { value: 'pendente', label: 'Pendente' },
          { value: 'realizado', label: 'Realizado' },
          { value: 'entregue', label: 'Entregue' },
        ]}
      />

      {error && <ErrorMessage message={error}/>}

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={loading || !status}
        >
          {loading ? 'Atualizando...' : 'Atualizar Status'}
        </Button>

        {onCancel && (
          <CloseButton
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </CloseButton>
        )}
      </div>
    </UserFormModal>
  );
}
