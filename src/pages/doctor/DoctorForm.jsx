import AppointmentForm from '../../components/form/AppointmentForm'; 

export default function DoctorForm() {
    const token = localStorage.getItem('token');
    const doctorId = localStorage.getItem('doctorId');

    const handleSuccess = () => {
        alert('Consulta agendada com sucesso!');
    };

    return (
        <div>
            <AppointmentForm
                doctorId={doctorId}
                onSuccess={handleSuccess}
                token={token} 
            />
        </div>
    );
}
