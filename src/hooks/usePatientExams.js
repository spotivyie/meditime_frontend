import { useState, useEffect } from 'react';
import api from '../services/api';
import { parseJwt } from '../utils/useJwt';

export default function usePatientExams() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const payload = parseJwt(token);
    const pacienteId = payload ? payload.userId || payload.id || null : null;

    useEffect(() => {
        if (pacienteId) {
            fetchExams();
        } else {
            setError('Paciente não identificado. Faça login novamente.');
            setLoading(false);
        }
    }, [pacienteId]);

    const fetchExams = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/exames/${pacienteId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const sorted = data.sort(
                (a, b) => new Date(b.dataSolicitacao) - new Date(a.dataSolicitacao)
            );

            setExams(sorted);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Erro ao carregar seus exames');
        } finally {
            setLoading(false);
        }
    };

    return { exams, loading, error };
}
