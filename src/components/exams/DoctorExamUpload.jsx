import { useState } from 'react';
//services
import api from '../../services/api';
//components
import ExamInput from '../ui/ExamInput';
import FileInput from '../ui/FileInput';
import CloseButton from '../ui/CloseButton';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import UserFormModal from '../ui/UserFormModal';
import SectionTitle from '../ui/SectionTitle';

export default function DoctorExamUpload({ onCancel }) {
  const [exameId, setExameId] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    if (!exameId || !file) {
      setError('Informe o ID do exame e selecione um arquivo.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resultado', file);
      await api.post(`/exames/${exameId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      alert('Resultado enviado com sucesso!');
      setFile(null);
      setExameId('');
      if (onCancel) onCancel();
    } catch {
      setError('Erro no upload. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserFormModal>
      <SectionTitle>Enviar Resultado do Exame</SectionTitle>

      <ExamInput
        label="ID do Exame"
        type="text"
        value={exameId}
        onChange={(e) => setExameId(e.target.value)}
        placeholder="Digite o ID do exame"
      />

      <FileInput
        label="Arquivo"
        file={file}
        onChange={setFile}
      />

      {error && (
        <ErrorMessage message={error}/>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleSubmit}
          disabled={loading || !exameId || !file}
        >
          {loading ? 'Enviando...' : 'Enviar Resultado'}
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