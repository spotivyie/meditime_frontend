import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//services
import api from '../services/api';
//components
import Input from '../components/ui/Input';
import AuthButton from '../components/ui/AuthButton';
//images
import Doctor from '../assets/image.jpg';
import Logo from '../assets/meditime.png';
import EmptyState from '../components/ui/EmptyState';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password }, {
        withCredentials: true 
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      if (data.role === 'doctor') localStorage.setItem('doctorId', data._id);
      else if (data.role === 'patient') localStorage.setItem('patientId', data._id);
      else if (data.role === 'admin') localStorage.setItem('adminId', data._id);

      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert(error.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-500 items-center justify-center">
        <img src={Doctor} alt="Logo" className="w-full h-full object-cover opacity-50"/>
      </div>

      <div className="w-full lg:w-1/2 bg-gray-900 text-white flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md space-y-6">
          <div className="flex justify-center">
            <img
              src={Logo}
              alt="Logo da Empresa"
              className="h-20 w-auto mb-10" 
            />
          </div>

          <h2 className="text-2xl font-bold text-center">Acesse sua conta</h2>

          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <EmptyState message='Email: teste@hotmail.com / doctor@hotmail.com'/> */}
            <Input
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <EmptyState message='Senha: teste123'/> */}
          </div>

          <div className="text-right text-sm">
            <a href="#" className="text-blue-400 hover:underline">Esqueci minha senha</a>
          </div>

          <AuthButton type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </AuthButton>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-400">Não tem uma conta?</span>{' '}
            <a href="/register" className="text-blue-400 hover:underline">Crie sua conta grátis</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
