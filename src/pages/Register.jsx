import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
//services
import api from '../services/api';
//components
import Input from '../components/ui/Input';
import AuthButton from '../components/ui/AuthButton';
//icons
import { Plus } from 'lucide-react';
//images
import Logo from '../assets/image.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', 'patient');
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      await api.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Cadastro realizado com sucesso!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Erro ao registrar');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-500 items-center justify-center">
        <img src={Logo} alt="Logo" className="w-full h-full object-cover opacity-50"/>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-900 text-white flex items-center justify-center px-4">
        <form onSubmit={handleRegister} className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center">Cadastre-se gratuitamente</h2>

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => fileRef.current.click()}
              className="w-32 h-32 rounded-full border border-gray-700 flex items-center justify-center cursor-pointer bg-gray-800 hover:bg-gray-700 transition overflow-hidden"
            >
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <Plus className="w-8 h-8 text-gray-400" />
              )}
            </div>
            <p className="text-sm text-center text-gray-400">
              Adicionar uma foto é opcional
            </p>
          </div>

          <Input
            type="text"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Senha (mínimo 7 caracteres)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={7}
            required
          />

          <Input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={7}
            required
          />

          <p className="text-xs text-center text-gray-500">
            Ao se cadastrar, você aceita nossos{' '}
            <a href="#" className="text-blue-400 underline">termos de uso</a> e nossa{' '}
            <a href="#" className="text-blue-400 underline">política de privacidade</a>.
          </p>

          <AuthButton>
            Cadastrar-se gratuitamente
          </AuthButton>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-400">Já tem uma conta?</span>{' '}
            <a href="/login" className="text-blue-400 hover:underline">Faça login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
