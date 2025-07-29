import { useState } from 'react';
import { useParams } from 'react-router-dom';
//hooks
import usePatientDetails from '../../hooks/usePatientDetails';
//components
import WrapperCard from '../../components/ui/WrapperCard';
import SectionTitle from '../../components/ui/SectionTitle';
import EmptyState from '../../components/ui/EmptyState';
import ErrorMessage from '../../components/ui/ErrorMessage';
import PatientDetails from '../../components/admin/PatientDetails';
import ExamList from '../../components/admin/ExamList';
import AppointmentList from '../../components/admin/AppointmentList';
import useCurrentUser from '../../hooks/CurrentUserFetcher';

export default function AdminPatientDetails() {
  const { patientId } = useParams();
  const token = localStorage.getItem('token');
  const currentUser = useCurrentUser(token);
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  
  const { patient, exams, appointments, loading, error, refetch } = usePatientDetails(patientId, token, currentUser);

  const [showNewExam, setShowNewExam] = useState(false);
  const [showUpdateStatus, setShowUpdateStatus] = useState(null);
  const [showUploadResult, setShowUploadResult] = useState(null);

  const onFormSubmit = () => {
    setShowNewExam(false);
    setShowUpdateStatus(null);
    setShowUploadResult(null);
  };
  
console.log(patient);
  return (
    <WrapperCard>
      {loading ? (
        <EmptyState message="Carregando dados do paciente..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : !patient ? (
        <EmptyState message="Paciente não encontrado." />
      ) : (
        <>
          <SectionTitle>Detalhes do Paciente</SectionTitle>
          <PatientDetails patient={patient} patientId={patientId} baseURL={`${apiBaseUrl}/uploads`} />
          <ExamList
            exams={exams}
            showNewExam={showNewExam}
            setShowNewExam={setShowNewExam}
            showUpdateStatus={showUpdateStatus}
            setShowUpdateStatus={setShowUpdateStatus}
            showUploadResult={showUploadResult}
            setShowUploadResult={setShowUploadResult}
            baseURL={apiBaseUrl}
            patient={patient}  
            onFormSubmit={onFormSubmit} 
            refetchExams={refetch}
          />
          <AppointmentList appointments={appointments} />
        </>
      )}
    </WrapperCard>
  );
}