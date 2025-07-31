import { useEffect, useState } from 'react';
//services
import api from '../../services/api';
//components
import Input from '../ui/Input';
import Button from '../ui/Button';
import WrapperCard from '../ui/WrapperCard';
import SectionTitle from '../ui/SectionTitle';
import HourPicker from '../ui/HourPicker';
import InputDate from '../ui/InputDate';
import EmptyState from '../ui/EmptyState';

export default function AppointmentForm({
    doctorId: propDoctorId,
    patientId: propPatientId,
    onSuccess
}) {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [availableHours, setAvailableHours] = useState([]);
    const [loadingDoctors, setLoadingDoctors] = useState(true);
    const [loadingPatients, setLoadingPatients] = useState(true);
    const [loadingHours, setLoadingHours] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [form, setForm] = useState({
        doctorId: propDoctorId || '',
        patientId: propPatientId || '',
        date: '',
        hour: '',
        notes: ''
    });

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!propDoctorId) fetchDoctors();
        else setLoadingDoctors(false);

        if (!propPatientId) fetchPatients();
        else setLoadingPatients(false);
    }, []);

    useEffect(() => {
        if (form.doctorId && form.date) {
            fetchAvailableHours(form.doctorId, form.date);
        }
    }, [form.doctorId, form.date]);

    const fetchDoctors = async () => {
        setLoadingDoctors(true);
        try {
            const { data } = await api.get('/doctors', { headers: { Authorization: `Bearer ${token}` } });
            setDoctors(data);
        } catch {
            setDoctors([]);
        } finally {
            setLoadingDoctors(false);
        }
    };

    const fetchPatients = async () => {
        setLoadingPatients(true);
        try {
            const { data } = await api.get('/patients', { headers: { Authorization: `Bearer ${token}` } });
            setPatients(data);
        } catch {
            setPatients([]);
        } finally {
            setLoadingPatients(false);
        }
    };

    const fetchAvailableHours = async (doctorId, date) => {
        setLoadingHours(true);
        try {
            const { data } = await api.get(`/availability?doctorId=${doctorId}&date=${date}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAvailableHours(data);
        } catch {
            setAvailableHours([]);
        } finally {
            setLoadingHours(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
            ...(name === 'doctorId' || name === 'date' ? { hour: '' } : {})
        }));
    };

    const handleSubmit = async () => {
        if (!(form.doctorId && form.patientId && form.date && form.hour)) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        setSubmitting(true);
        try {
            await api.post('/appointments', {
                doctor: form.doctorId,
                patient: form.patientId,
                date: `${form.date}T${form.hour}:00`,
                notes: form.notes
            }, { headers: { Authorization: `Bearer ${token}` } });

            alert('Consulta agendada com sucesso!');
            setForm({
                doctorId: propDoctorId || '',
                patientId: propPatientId || '',
                date: '',
                hour: '',
                notes: ''
            });
            setAvailableHours([]);
            if (onSuccess) onSuccess();
        } catch {
            alert('Erro ao agendar consulta');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <WrapperCard className='max-w-xl'>
            <SectionTitle>Marcar Consulta</SectionTitle>

            <div className='bg-gray-900 p-4 space-y-4 rounded'>
                <div className="flex flex-wrap lg:flex-nowrap gap-4">
                {!propDoctorId && (
                    <div className="w-full md:w-1/2">
                        {loadingDoctors ? (
                            <EmptyState message="Carregando médicos..."/>
                        ) : (
                            <Input
                                label="Médico"
                                name="doctorId"
                                value={form.doctorId}
                                onChange={handleChange}
                                select
                                options={[
                                        { value: '', label: 'Selecione um médico' },
                                        ...doctors.map((d) => ({
                                        value: d._id,
                                        label: `${d.name}`,
                                    })),
                                ]}
                            />
                        )}
                    </div>
                )}

                {!propPatientId && (
                    <div className="w-full md:w-1/2">
                        {loadingPatients ? (
                            <EmptyState message="Carregando pacientes..."/>
                        ) : (
                            <Input
                                label="Paciente"
                                name="patientId"
                                value={form.patientId}
                                onChange={handleChange}
                                select
                                options={[
                                    { value: '', label: 'Selecione um paciente' },
                                    ...patients.map((p) => ({ value: p._id, label: p.name })),
                                ]}
                            />
                        )}
                    </div>
                )}
            </div>

            <div>
                <InputDate
                    label="Data"
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>

            <div>
                <HourPicker
                    label="Horário"
                    hours={availableHours}
                    selected={form.hour}
                    onSelect={(hour) => setForm((prev) => ({ ...prev, hour }))}
                    loading={loadingHours}
                />
            </div>

            <div>
                <Input
                    label="Observações"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    textarea
                    rows={3}
                />
            </div>

            <Button
                fullWidth
                onClick={handleSubmit}
                disabled={submitting || !(form.doctorId && form.patientId && form.date && form.hour)}>
                    {submitting ? 'Agendando...' : 'Agendar Consulta'}
            </Button>
            </div>
        </WrapperCard>
    );
}
