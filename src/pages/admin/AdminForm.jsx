//components
import AppointmentForm from '../../components/form/AppointmentForm';

export default function AdminForm() {
    const token = localStorage.getItem('token');

    const handleSuccess = () => {
        alert('Consulta agendada com sucesso pelo Admin!');
    };

    return (
        <div>
            <AppointmentForm 
                onSuccess={handleSuccess}
                token={token} 
            />
        </div>
    );
}
