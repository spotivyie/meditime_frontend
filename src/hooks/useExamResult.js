import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';  

export default function useExamResult() {
    const { examId } = useParams(); 
    const [exam, setExam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        if (!examId) {
            setError('ID do exame não fornecido.');
            setLoading(false);
            return;
        }

        const fetchExamDetails = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/exames/detail/${examId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExam(data);  
                setError('');  
            } catch (err) {
                setError('Erro ao carregar o exame: ' + err.message);  
            } finally {
                setLoading(false);  
            }
        };

        fetchExamDetails();
    }, [examId, token]);  

    return { exam, loading, error };
}
