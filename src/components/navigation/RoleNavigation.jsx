import { useEffect, useState } from 'react';
//utils
import { parseJwt } from '../../utils/useJwt';
//navigations
import PatientNavigation from './PatientNavigation';
import DoctorNavigation from './DoctorNavigation';
import AdminNavigation from './AdminNavigation';
//components
import EmptyState from '../ui/EmptyState';

export default function RoleNavigation() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const payload = parseJwt(token);

    if (payload?.role) {
      setRole(payload.role);
    } else {
      setRole('unknown');
    }
  }, []);

  if (role === null) {
    return <EmptyState message="Carregando..." />;
  }

  switch (role) {
    case 'patient':
      return <PatientNavigation />;
    case 'doctor':
      return <DoctorNavigation />;
    case 'admin':
      return <AdminNavigation />;
    default:
      return <EmptyState message="Perfil não reconhecido." />;
  }
}
