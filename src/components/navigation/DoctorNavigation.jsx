//components
import NavLinkButton  from '../ui/NavLinkButton'

export default function DoctorNavigation() {
    return (
        <div>
            <div className="flex flex-wrap space-x-2 space-y-2 lg:space-y-0 lg:flex-row flex-col">
                <NavLinkButton to="/medico/minhas-consultas">
                    Minhas Consultas
                </NavLinkButton>
                <NavLinkButton to="/admin/patients">
                    Meus Pacientes
                </NavLinkButton>
                <NavLinkButton to="/medico/remarcar-consulta">
                    Remarcar Consulta
                </NavLinkButton>
            </div>
        </div>
    );
}
