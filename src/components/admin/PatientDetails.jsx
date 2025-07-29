import React from 'react';

export default function PatientDetails({ patient, patientId, baseURL }) {
  const apiBaseUrl = import.meta.env.VITE_BASE_URL;
  const imageUrl = patient.photo ? `${apiBaseUrl}${patient.photo}` : 'path_to_default_image'; 
  
  return (
    <div className="block lg:flex items-center my-8">
      {patient.photo ? (
        <img
          src={imageUrl}  
          alt={`${patient.name}'s profile`}
          className="w-32 h-32 rounded-full object-cover mr-4"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-400 rounded-full flex items-center justify-center mr-4">
          <span className="text-white font-bold">Sem Foto</span>
        </div>
      )}
      <div className='space-y-2 mt-10 xl:mt-0'>
        <p><strong>Nome:</strong> {patient.name}</p>
        <p><strong>ID do Paciente:</strong> {patientId}</p>
        <p><strong>Email:</strong> {patient.email}</p>
      </div>
    </div>
  );
}
