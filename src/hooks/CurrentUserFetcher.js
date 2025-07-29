import { useEffect, useState } from 'react';
import api from '../services/api';

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await api.get('/auth/me', { withCredentials: true });
        setCurrentUser(data);
      } catch (err) {
        console.error('Erro ao buscar usuário atual:', err);
      }
    };
    fetchCurrentUser();
  }, []);

  return currentUser;
}
