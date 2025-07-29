import { useEffect, useState } from 'react'; 
//services
import api from '../../services/api'; 
//components
import UserForm from '../../components/admin/UserForm'; 
import SectionTitle from '../../components/ui/SectionTitle'; 
import WrapperCard from '../../components/ui/WrapperCard'; 
import Button from '../../components/ui/Button'; 
import Modal from '../../components/ui/Modal';
import EmptyState from '../../components/ui/EmptyState';
import ErrorMessage from '../../components/ui/ErrorMessage';
import UserList from '../../components/admin/UserList';

export default function AdminUsers() {
  const [patients, setPatients] = useState([]); 
  const [doctors, setDoctors] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const [form, setForm] = useState({ name: '', email: '', role: 'patient', password: '' }); 
  const [editingUserId, setEditingUserId] = useState(null); 
  const [showForm, setShowForm] = useState(false); 

  const token = localStorage.getItem('token');

  useEffect(() => { 
    fetchUsers(); 
  }, []);

  const fetchUsers = async () => { 
    setLoading(true); 
    try {
      const { data } = await api.get('/admin/users', { 
        headers: { Authorization: `Bearer ${token}` }, 
      });

      setPatients(data.filter(user => user.role === 'patient'));
      setDoctors(data.filter(user => user.role === 'doctor'));
      setError('');
    } catch (err) {
      setError('Erro ao carregar usuários', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', role: 'patient', password: '' });
    setEditingUserId(null);
    setShowForm(false); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await api.put(`/admin/users/${editingUserId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Usuário atualizado com sucesso!');
      } else {
        await api.post('/admin/users', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Usuário criado com sucesso!');
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao salvar usuário');
    }
  };

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setForm({ name: user.name, email: user.email, role: user.role, password: '' });
    setShowForm(true); 
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Tem certeza que deseja deletar esse usuário?')) return;
    try {
      await api.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Usuário deletado com sucesso!');
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Erro ao deletar usuário');
    }
  };

  return (
    <WrapperCard>
      <SectionTitle>Usuários</SectionTitle>
      <Button onClick={() => {
        resetForm();
        setShowForm(true); 
      }}>
        + Criar Usuário
      </Button>

      <Modal isOpen={showForm} onClose={resetForm}>
        <UserForm
          form={form}
          setForm={setForm}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingUserId} 
        />
      </Modal>

      {loading ? (
        <EmptyState message="Carregando usuários..." />
      ) : error ? (
        <ErrorMessage message={error}/>
      ) : (
        <>
          <UserList
            users={doctors}
            title="Médicos"
            onEdit={startEdit}
            onDelete={handleDeleteUser}
          />
          
          <UserList
            users={patients}
            title="Pacientes"
            onEdit={startEdit}
            onDelete={handleDeleteUser}
          />
        </>
      )}
    </WrapperCard>
  );
}
