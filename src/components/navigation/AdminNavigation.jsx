//components
import NavLinkButton  from '../ui/NavLinkButton'

export default function AdminNavigation() {
    return (
        <div>
            <div className="flex flex-wrap space-x-2 space-y-2 lg:space-y-0 lg:flex-row flex-col">
                <NavLinkButton to="/admin/users">
                    Usuários
                </NavLinkButton>
                <NavLinkButton to="/admin/patients">
                    Pacientes
                </NavLinkButton>
                <NavLinkButton to="/admin/appointments">
                    Agendamentos
                </NavLinkButton>
                <NavLinkButton to="/admin/agendar-consulta">
                    Agendar Consulta
                </NavLinkButton>
                <NavLinkButton to="/admin/reports">
                    Relatórios
                </NavLinkButton>
            </div>
        </div>
    );
}
