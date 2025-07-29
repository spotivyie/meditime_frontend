import { useState, useEffect } from 'react';
import api from '../services/api';

export default function usePatientDetails(patientId, token, currentUser) {
    const [patient, setPatient] = useState(null);
    const [exams, setExams] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPatientDetails = async () => {
            if (!currentUser) return;

            setLoading(true);
            try {
                const url = currentUser?.role === 'admin' ? '/admin/users' : '/patients';
                const { data } = await api.get(url, { headers: { Authorization: `Bearer ${token}` } });
                const foundPatient = data.find(u => u._id === patientId);

                if (!foundPatient) {
                    setError('Paciente não encontrado ou sem permissão de acesso');
                    setPatient(null);
                    setExams([]);
                    setAppointments([]);
                } else {
                    setPatient(foundPatient);
                    const [examsData, appointmentsData] = await Promise.all([
                        api.get(`/exames/${patientId}`, { headers: { Authorization: `Bearer ${token}` } }),
                        api.get(`/patient-history/${patientId}`, { headers: { Authorization: `Bearer ${token}` } }),
                    ]);
                    setExams(examsData.data);
                    setAppointments(appointmentsData.data);
                }
            } catch (err) {
                console.error('Erro ao carregar dados do paciente', err);
                setError('Erro ao carregar dados do paciente');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientDetails();
    }, [patientId, token, currentUser]);

    return { patient, exams, appointments, loading, error };
}
