//components
import AppointmentForm from '../../components/form/AppointmentForm'; 

export default function PatientForm() {
    const token = localStorage.getItem('token');
    const patientId = localStorage.getItem('patientId');

    const handleSuccess = () => {
        alert('Consulta agendada com sucesso!');
    };

    return (
        <div>
            <AppointmentForm
                patientId={patientId}
                onSuccess={handleSuccess}
                token={token} 
            />
        </div>
    );
}
