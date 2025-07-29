import { useState, useEffect } from 'react';
import api from '../services/api';

export default function usePatients(token, search = '', page = 0, patientsPerPage = 9) {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                const { data } = await api.get('/patients', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(data);
                setError('');
            } catch (err) {
                console.error(err);
                setError('Erro ao carregar pacientes');
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, [token]);

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(search.toLowerCase())
    );

    const totalPatients = filteredPatients.length;
    const totalPages = Math.ceil(totalPatients / patientsPerPage);
    const currentPatients = filteredPatients.slice(page * patientsPerPage, (page + 1) * patientsPerPage);

    return { currentPatients, totalPatients, totalPages, loading, error };
}
