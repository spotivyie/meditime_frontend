//hooks
import useExamResult from '../../hooks/useExamResult';
//components
import StatusBadge from '../../components/ui/StatusBadge';
import ErrorMessage from '../../components/ui/ErrorMessage';
import EmptyState from '../../components/ui/EmptyState';
import DownloadButton from '../../components/ui/DownloadButton';

export default function ExamResult() {
    const { exam, loading, error } = useExamResult(); 
    const baseURL = import.meta.env.VITE_BASE_URL;
    
    if (loading) return <EmptyState message="Carregando resultado do exame..." />;
    if (error) return <ErrorMessage message={error} />;
    if (!exam) return <EmptyState message="Exame não encontrado." />;

    const resultadoUrl = exam.resultadoUrl
        ? exam.resultadoUrl.startsWith('http')
            ? exam.resultadoUrl
            : `${baseURL}/${exam.resultadoUrl.replace(/\\/g, '/')}`
        : null;

    return (
        <div className="pt-6">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold">{exam.tipoExame}</h1>
                <StatusBadge status={exam.status} />
            </div>
            <p className="mb-2">
                <strong>Médico solicitante:</strong> {exam.doctorId?.name || 'Não informado'}
            </p>
            <p className="mb-6">
                Data: {new Date(exam.dataSolicitacao).toLocaleDateString('pt-BR')}
            </p>
            {exam.observacoes && (
                <p className="mb-4"><strong>Observações:</strong> {exam.observacoes}</p>
            )}

            {resultadoUrl ? (
                <>
                    <DownloadButton url={resultadoUrl} />
                    <embed
                        src={`${resultadoUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                        type="application/pdf"
                        className="w-full h-auto aspect-[8.5/11] border rounded"
                    />
                </>
            ) : (
                <EmptyState message="Resultado do exame não disponível." />
            )}
        </div>
    );
}