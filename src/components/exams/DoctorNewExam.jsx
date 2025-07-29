import { useEffect, useState } from 'react';
//services
import api from '../../services/api';
//components
import CloseButton from '../ui/CloseButton';
import ExamInput from '../ui/ExamInput';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import UserFormModal from '../ui/UserFormModal';
import SectionTitle from '../ui/SectionTitle';

export default function DoctorNewExam({ patient, onCancel, onSuccess }) {
  const [form, setForm] = useState({
    pacienteId: patient?._id || '',
    tipoExame: '',
    observacoes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (patient?._id) {
      setForm(prev => ({ ...prev, pacienteId: patient._id }));
    }
  }, [patient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.pacienteId || !form.tipoExame) {
      setError('Preencha o tipo de exame.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      const response = await api.post('/exames', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newExam = response.data;

      alert('Exame solicitado com sucesso!');
      setForm(prev => ({ ...prev, tipoExame: '', observacoes: '' }));

      if (onCancel) onCancel(); 
      if (onSuccess) onSuccess(newExam); 
    } catch {
      setError('Erro ao solicitar exame.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <UserFormModal>
      <SectionTitle>Solicitar Novo Exame</SectionTitle>
      <p className="text-sm text-gray-400 mb-4">
        <span className="font-medium text-gray-300">Paciente:</span> {patient?.name || 'Não informado'}
      </p>

      <form onSubmit={handleSubmit}>
        <ExamInput
          label="Tipo do Exame"
          name="tipoExame"
          value={form.tipoExame}
          onChange={handleChange}
          placeholder="Digite o tipo do exame"
        />

        <ExamInput
          label="Observações"
          name="observacoes"
          value={form.observacoes}
          onChange={handleChange}
          placeholder="Observações (opcional)"
          textarea
          rows={3}
        />

        {error && <ErrorMessage message={error} />}

        <div className="flex gap-3 mt-4">
          <Button type="submit" disabled={submitting || !form.tipoExame}>
            {submitting ? 'Solicitando...' : 'Solicitar Exame'}
          </Button>
          {onCancel && (
            <CloseButton onClick={onCancel} disabled={submitting}>
              Cancelar
            </CloseButton>
          )}
        </div>
      </form>
    </UserFormModal>
  );
}
