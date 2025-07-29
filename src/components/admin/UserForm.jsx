import React from 'react';
//components
import CloseButton from '../ui/CloseButton';
import Button from '../ui/Button';
import ExamInput from '../ui/ExamInput';
import SectionTitle from '../ui/SectionTitle';
import UserFormModal from '../ui/UserFormModal';

export default function UserForm({ form, setForm, onSubmit, onCancel, isEditing }) {
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <UserFormModal>
      <form onSubmit={onSubmit} className='space-y-4'>
        <SectionTitle>{isEditing ? 'Editar Usuário' : 'Criar Usuário'}</SectionTitle>

        <ExamInput
          placeholder="Nome"
          type="text"
          value={form.name}
          onChange={handleChange}
          name="name"
          required
        />

        <ExamInput
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          name="email"
          required
        />

        <ExamInput
          type="password"
          name="password"
          placeholder={isEditing ? "Deixe vazio para manter" : "Senha"}
          value={form.password}
          onChange={handleChange}
          {...(isEditing ? {} : { required: true })}
        />

        <ExamInput
          select
          value={form.role}
          onChange={handleChange}
          name="role"
          options={[
            { value: 'admin', label: 'Admin' },
            { value: 'doctor', label: 'Doctor' },
            { value: 'patient', label: 'Patient' },
          ]}
          required
        />

        <div className='space-x-2'>
          <Button
            type="submit"
          >
            {isEditing ? 'Salvar' : 'Criar'}
          </Button>
          <CloseButton onClick={onCancel} />
        </div>
      </form>
    </UserFormModal>
  );
}