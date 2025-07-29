import React from 'react';
//components
import UserInfoItem from '../ui/UserInfoItem';
import UserActions from '../ui/UserActions';
import EmptyState from '../ui/EmptyState';

const UserList = ({ users, title, onEdit, onDelete }) => (
  <div className="mt-8">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {users.length === 0 ? (
      <EmptyState message={`Nenhum ${title.toLowerCase()} encontrado.`} />
    ) : (
      <div className="hidden md:grid grid-cols-12 font-semibold p-2 rounded">
        <div className="col-span-4">Nome</div>
        <div className="col-span-4">Email</div>
        <div className="col-span-4 flex justify-end">Ações</div>
      </div>
    )}

    <div className="divide-y">
      {users.map((user) => (
        <div
          key={user._id}
          className="p-2 flex flex-col md:grid md:grid-cols-12 md:items-center gap-1 md:gap-2"
        >
          <UserInfoItem label="Nome">{user.name}</UserInfoItem>
          <UserInfoItem label="Email">{user.email}</UserInfoItem>
          <UserActions 
            onEdit={() => onEdit(user)} 
            onDelete={() => onDelete(user._id)}  
            variant="compact"
          />
        </div>
      ))}
    </div>
  </div>
);

export default UserList;
