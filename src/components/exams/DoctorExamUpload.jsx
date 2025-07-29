import { useState } from 'react';
//services
import api from '../../services/api';
//components
import FileInput from '../ui/FileInput';
import CloseButton from '../ui/CloseButton';
import Button from '../ui/Button';
import ErrorMessage from '../ui/ErrorMessage';
import UserFormModal from '../ui/UserFormModal';
import SectionTitle from '../ui/SectionTitle';

export default function DoctorExamUpload({ exameId, onCancel, onSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    if (!file) {
      setError('Selecione um arquivo.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('resultado', file);

      const { data } = await api.post(`/exames/${exameId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });

      alert('Resultado enviado com sucesso!');
      if (onSuccess) onSuccess(data); 
    } catch {
      setError('Erro no upload. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserFormModal>
      <SectionTitle>Enviar Resultado do Exame</SectionTitle>

      <p className="text-gray-400 mb-4">
        <span className="font-medium text-gray-300">ID do Exame:</span> {exameId}
      </p>

      <FileInput label="Arquivo" file={file} onChange={setFile} />

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-3">
        <Button onClick={handleSubmit} disabled={loading || !file}>
          {loading ? 'Enviando...' : 'Enviar Resultado'}
        </Button>
        <CloseButton onClick={onCancel} disabled={loading}>
          Cancelar
        </CloseButton>
      </div>
    </UserFormModal>
  );
}
