import React, { useState } from 'react';
//components
import Modal from '../ui/Modal';
import StatusBadge from '../ui/StatusBadge';
import ActionButton from '../ui/ActionButton';
import DoctorExamStatus from '../exams/DoctorExamStatus';
import DoctorExamUpload from '../exams/DoctorExamUpload';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';
//exams
import DoctorNewExam from '../exams/DoctorNewExam'; 

export default function ExamList({
  exams: initialExams,  // Recebe os exames inicialmente
  showNewExam,
  setShowNewExam,
  showUpdateStatus,
  setShowUpdateStatus,
  showUploadResult,
  setShowUploadResult,
  baseURL,
  patient 
}) {
  const [exams, setExams] = useState(initialExams);  // Gerenciar os exames com estado local

  const onFormSubmit = () => {
    setShowNewExam(false);
    setShowUpdateStatus(null);
    setShowUploadResult(null);
  };

  const handleUpdateExamStatus = (updatedExam) => {
    // Atualizar o estado dos exames com os dados alterados
    const updatedExams = exams.map(exam => 
      exam._id === updatedExam._id ? updatedExam : exam
    );
    setExams(updatedExams);  // Atualiza o estado local
  };

  const handleUploadExamResult = (updatedExam) => {
    // Atualizar o estado dos exames com os resultados enviados
    const updatedExams = exams.map(exam => 
      exam._id === updatedExam._id ? updatedExam : exam
    );
    setExams(updatedExams);  // Atualiza o estado local
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
        <span>Exames:</span>
        <Button onClick={() => setShowNewExam(!showNewExam)}>
          Solicitar Exame
        </Button>
      </h3>

      <Modal isOpen={showNewExam} onClose={() => setShowNewExam(false)}>
        <DoctorNewExam
          patient={patient} 
          onCancel={() => setShowNewExam(false)}
          onSuccess={onFormSubmit} 
        />
      </Modal>

      {exams.length === 0 ? (
        <EmptyState message="Esse paciente não possui exames cadastrados." />
      ) : (
        exams.map((exam) => {
          const resultadoUrl = exam.resultadoUrl
            ? exam.resultadoUrl.startsWith('http')
              ? exam.resultadoUrl
              : `${baseURL}/${exam.resultadoUrl.replace(/\\/g, '/')}`
            : null;

          return (
            <div key={exam._id} className="p-3 bg-gray-900 rounded mb-4">
              <p>
                <strong>Tipo:</strong> {exam.tipoExame}
              </p>
              <p>
                <strong>ID do Exame:</strong> {exam._id}
              </p>
              <p>
                <strong>Data:</strong> {new Date(exam.createdAt).toLocaleDateString('pt-BR')}
              </p>
              {exam.observacoes && (
                <p className='mb-2'>
                  <strong>Obs:</strong> {exam.observacoes}
                </p>
              )}
              <div className="lg:flex justify-between items-center">
                <StatusBadge status={exam.status} />
                
                {resultadoUrl ? (
                  <div className="mt-4">
                    <a href={resultadoUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline cursor-pointer">
                      Ver Resultado
                    </a>
                  </div>
                ) : (
                  <div className="mt-3 space-x-2 flex gap-2">
                    <ActionButton
                      color="yellow"
                      onClick={() =>
                        setShowUpdateStatus(exam._id === showUpdateStatus ? null : exam._id)
                      }
                    >
                      Atualizar Status
                    </ActionButton>

                    <ActionButton
                      color="green"
                      onClick={() =>
                        setShowUploadResult(exam._id === showUploadResult ? null : exam._id)
                      }
                    >
                      Enviar Resultado
                    </ActionButton>
                  </div>
                )}
              </div>

              <Modal isOpen={showUpdateStatus === exam._id} onClose={() => setShowUpdateStatus(null)}>
                <DoctorExamStatus
                  exameId={exam._id}
                  onCancel={() => setShowUpdateStatus(null)}
                  onSuccess={(updatedExam) => {
                    handleUpdateExamStatus(updatedExam);  // Atualiza o status do exame
                    setShowUpdateStatus(null);
                  }}
                />
              </Modal>

              <Modal isOpen={showUploadResult === exam._id} onClose={() => setShowUploadResult(null)}>
                <DoctorExamUpload
                  exameId={exam._id}
                  onCancel={() => setShowUploadResult(null)}
                  onSuccess={(updatedExam) => {
                    handleUploadExamResult(updatedExam);  // Atualiza o resultado do exame
                    setShowUploadResult(null);
                  }}
                />
              </Modal>
            </div>
          );
        })
      )}
    </>
  );
}
