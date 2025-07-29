//hooks
import usePatientExams from '../../hooks/usePatientExams';
//components
import SectionTitle from '../../components/ui/SectionTitle';
import WrapperCard from '../../components/ui/WrapperCard';
import StatusBadge from '../../components/ui/StatusBadge';
import ViewResultButton from '../../components/ui/ViewResultButton';
import EmptyState from '../../components/ui/EmptyState';
import ExamCard from '../../components/ui/ExamCard';

export default function PatientExams() {
    const { exams, loading, error } = usePatientExams();

    return (
        <WrapperCard>
            <SectionTitle>Meus Exames</SectionTitle>

            {loading ? (
                <EmptyState message="Carregando exames..." />
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : exams.length === 0 ? (
                <EmptyState message="Você não possui exames cadastrados ainda." />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {exams.map(exam => (
                        <div key={exam._id} className="bg-gray-900 rounded-xl p-4">
                            <ExamCard
                                key={exam._id}
                                title={exam.tipoExame}
                                subtitle={`Médico: ${exam.doctorId?.name || 'Não informado'}`}
                                data={exam.dataSolicitacao}
                            />
                            <div className="flex justify-between items-center">
                                <StatusBadge status={exam.status} />
                                <ViewResultButton examId={exam._id} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </WrapperCard>
    );
}