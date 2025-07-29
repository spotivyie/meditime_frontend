import { useEffect, useRef, useState } from 'react';
//services
import api from '../services/api';
//components
import Input from '../components/ui/Input';
import SectionTitle from '../components/ui/SectionTitle';
import AuthButton from '../components/ui/AuthButton';
//icons
import { Plus } from 'lucide-react';

export default function EditProfile() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const token = localStorage.getItem('token');
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setForm({ name: data.name || '', email: data.email || '', password: '' });

      if (data.photo) {
        const url = data.photo.startsWith('http')
          ? data.photo
          : `${apiBaseUrl}${data.photo.replace(/\\/g, '/')}`;

        setPreview(`${url}?t=${Date.now()}`);
      } else {
        setPreview(null);
      }
    } catch (err) {
      alert('Erro ao carregar dados do usuário');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    if (form.password) formData.append('password', form.password);
    if (photo) formData.append('photo', photo);

    try {
      const { data } = await api.put('/auth/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      alert('Perfil atualizado com sucesso!');

      setForm(prev => ({ ...prev, password: '' }));

      if (data.photo) {
        const url = data.photo.startsWith('http')
          ? data.photo
          : `${apiBaseUrl}${data.photo.replace(/\\/g, '/')}`;

        setPreview(`${url}?t=${Date.now()}`);
      } else {
        setPreview(null);
      }
      setPhoto(null);
    } catch (err) {
      alert('Erro ao atualizar perfil', err);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-4">
      <SectionTitle className="text-center">Editar Perfil</SectionTitle>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          ref={fileRef}
          onChange={handlePhotoChange}
          accept="image/*"
          className="hidden"
        />

        <div
          onClick={() => fileRef.current.click()}
          className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition overflow-hidden mx-auto mb-4"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <Plus className="w-12 h-12 text-gray-500" />
          )}
        </div>

        <Input name="name" value={form.name} onChange={handleChange} label="Nome" />
        <Input name="email" value={form.email} onChange={handleChange} label="Email" type="email" />
        <Input name="password" value={form.password} onChange={handleChange} label="Nova Senha" type="password" />

        <AuthButton>
          Salvar Alterações
        </AuthButton>
      </form>
    </div>
  );
}
