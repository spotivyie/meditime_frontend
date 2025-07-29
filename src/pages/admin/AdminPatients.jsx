import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//hooks
import usePatients from '../../hooks/usePatients';
//components
import WrapperCard from '../../components/ui/WrapperCard';
import SectionTitle from '../../components/ui/SectionTitle';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import ErrorMessage from '../../components/ui/ErrorMessage';
import PaginationControls from '../../components/ui/PaginationControls';

export default function PatientsList() {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const patientsPerPage = 9;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const { currentPatients, totalPatients, totalPages, loading, error } = usePatients(token, search, page, patientsPerPage);

    const handlePrev = () => setPage(prev => Math.max(prev - 1, 0));
    const handleNext = () => setPage(prev => Math.min(prev + 1, totalPages - 1));

    return (
        <WrapperCard>
            <SectionTitle>Pacientes</SectionTitle>

            <input
                type="text"
                placeholder="Buscar pelo nome do paciente..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-64 p-2 mb-4 border rounded"
            />

            {loading ? (
                <EmptyState message="Carregando pacientes..." />
            ) : error ? (
                <ErrorMessage message={error} />
            ) : currentPatients.length === 0 ? (
                <EmptyState message="Nenhum paciente encontrado." />
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentPatients.map(patient => (
                            <div key={patient._id} className="bg-gray-900 rounded-xl p-4">
                                <h3 className="text-lg font-semibold mb-1">{patient.name}</h3>
                                <p className="text-sm text-gray-600 mb-3">{patient.email}</p>
                                <Button onClick={() => navigate(`/admin/patients/${patient._id}`)}>
                                    Ver Detalhes
                                </Button>
                            </div>
                        ))}
                    </div>

                    <PaginationControls
                        page={page}
                        totalPages={totalPages}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        setPageNumber={setPage}
                    />
                </>
            )}
        </WrapperCard>
    );
}