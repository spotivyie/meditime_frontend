//components
import NavLinkButton from '../ui/NavLinkButton';

export default function PatientNavigation() {
    return (
        <div>
            <div className="flex flex-wrap space-x-2 space-y-2 lg:space-y-0 lg:flex-row flex-col">
                <NavLinkButton to="/agendar-consulta">
                    Agendar Consulta
                </NavLinkButton>
                <NavLinkButton to="/minhas-consulta">
                    Minhas Consultas
                </NavLinkButton>
                <NavLinkButton to="/exames">
                    Meus Exames
                </NavLinkButton>
            </div>
        </div>
    );
}
