import React from 'react';
//components
import StatusBadge from '../ui/StatusBadge';
import ActionButton from '../ui/ActionButton';
import Modal from '../ui/Modal';
//exams
import DoctorExamStatus from '../exams/DoctorExamStatus';
import DoctorExamUpload from '../exams/DoctorExamUpload';

export default function ExamItem({
  exam,
  baseURL,
  showUpdateStatus,
  setShowUpdateStatus,
  showUploadResult,
  setShowUploadResult,
  handleFormSuccess
}) {
  const resultadoUrl = exam.resultadoUrl
    ? exam.resultadoUrl.startsWith('http')
      ? exam.resultadoUrl
      : `${baseURL}/${exam.resultadoUrl.replace(/\\/g, '/')}`
    : null;

  const toggleModal = (type) => {
    if (type === 'status') {
      setShowUpdateStatus(showUpdateStatus === exam._id ? null : exam._id);
    } else {
      setShowUploadResult(showUploadResult === exam._id ? null : exam._id);
    }
  };

  return (
    <div className="p-3 bg-gray-900 rounded mb-4">
      <p><strong>Tipo:</strong> {exam.tipoExame}</p>
      <p><strong>ID do Exame:</strong> {exam._id}</p>
      <p><strong>Data:</strong> {new Date(exam.createdAt).toLocaleDateString('pt-BR')}</p>

      {exam.observacoes && (
        <p className="mb-2"><strong>Obs:</strong> {exam.observacoes}</p>
      )}

      <div className="lg:flex justify-between items-center">
        <StatusBadge status={exam.status} />

        {resultadoUrl ? (
          <div className="mt-4">
            <a
              href={resultadoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:underline cursor-pointer"
            >
              Ver Resultado
            </a>
          </div>
        ) : (
          <div className="mt-3 flex gap-2 flex-wrap">
            <ActionButton color="yellow" onClick={() => toggleModal('status')}>
              Atualizar Status
            </ActionButton>
            <ActionButton color="green" onClick={() => toggleModal('upload')}>
              Enviar Resultado
            </ActionButton>
          </div>
        )}
      </div>

      <Modal isOpen={showUpdateStatus === exam._id} onClose={() => setShowUpdateStatus(null)}>
        <DoctorExamStatus
          exameId={exam._id}
          onCancel={() => setShowUpdateStatus(null)}
          onSuccess={handleFormSuccess}
        />
      </Modal>

      <Modal isOpen={showUploadResult === exam._id} onClose={() => setShowUploadResult(null)}>
        <DoctorExamUpload
          exameId={exam._id}
          onCancel={() => setShowUploadResult(null)}
          onSuccess={handleFormSuccess}
        />
      </Modal>
    </div>
  );
}
