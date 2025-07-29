import { useEffect, useState } from 'react';
//services
import api from '../../services/api';
//components
import CloseButton from '../ui/CloseButton';
import ExamInput from '../ui/ExamInput';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import ModalCard from '../ui/ModalCard';
import SectionTitle from '../ui/SectionTitle';

export default function DoctorNewExam({ patient, onCancel }) {
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

  const handleSubmit = async () => {
    if (!form.pacienteId || !form.tipoExame) {
      setError('Preencha o tipo de exame.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await api.post('/exames', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Exame solicitado com sucesso!');
      setForm(prev => ({ ...prev, tipoExame: '', observacoes: '' }));
      if (onCancel) onCancel();
    } catch {
      setError('Erro ao solicitar exame.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ModalCard>
      <SectionTitle>Solicitar Novo Exame</SectionTitle>

      <div>
        <p className="text-sm text-gray-400 mb-4">
          <span className="font-medium text-gray-300">Paciente:</span> {patient?.name || 'Não informado'}
        </p>
      </div>

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
        placeholder="Observações do exame (opcional)"
        textarea
        rows={3}
      />

      {error && <ErrorMessage message={error}/>}

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={submitting || !form.tipoExame}
        >
          {submitting ? 'Solicitando...' : 'Solicitar Exame'}
        </Button>

        {onCancel && (
          <CloseButton
            onClick={onCancel}
            disabled={submitting}
          >
            Cancelar
          </CloseButton>
        )}
      </div>
    </ModalCard>
  );
}
