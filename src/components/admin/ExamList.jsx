import React, { useEffect, useState } from 'react';
//components
import Modal from '../ui/Modal';
import EmptyState from '../ui/EmptyState';
import Button from '../ui/Button';
//exams
import DoctorNewExam from '../exams/DoctorNewExam';
import ExamItem from './ExamItem';

export default function ExamList({
  exams,
  showNewExam,
  setShowNewExam,
  showUpdateStatus,
  setShowUpdateStatus,
  showUploadResult,
  setShowUploadResult,
  baseURL,
  patient,
  refetchExams
}) {
  const [examList, setExamList] = useState(exams);

  useEffect(() => {
    setExamList(exams);
  }, [exams]);

  const handleFormSuccess = (exam = null) => {
    setShowNewExam(false);
    setShowUpdateStatus(null);
    setShowUploadResult(null);

    if (exam) {
      setExamList(prev => {
        const exists = prev.find(ex => ex._id === exam._id);
        if (exists) {
          return prev.map(ex => (ex._id === exam._id ? exam : ex)); 
        } else {
          return [...prev, exam]; 
        }
      });
    } else {
      refetchExams(); 
    }
  };

  return (
    <>
      <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
        <span>Exames:</span>
        <Button onClick={() => setShowNewExam(true)}>Solicitar Exame</Button>
      </h3>

      <Modal isOpen={showNewExam} onClose={() => setShowNewExam(false)}>
        <DoctorNewExam
          patient={patient}
          onCancel={() => setShowNewExam(false)}
          onSuccess={handleFormSuccess} 
        />
      </Modal>

      {examList.length === 0 ? (
        <EmptyState message="Esse paciente não possui exames cadastrados." />
      ) : (
        examList.map(exam => (
          <ExamItem
            key={exam._id}
            exam={exam}
            baseURL={baseURL}
            showUpdateStatus={showUpdateStatus}
            setShowUpdateStatus={setShowUpdateStatus}
            showUploadResult={showUploadResult}
            setShowUploadResult={setShowUploadResult}
            handleFormSuccess={handleFormSuccess}
          />
        ))
      )}
    </>
  );
}
