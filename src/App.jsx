import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';
import PrivateRoute from './components/routes/PrivateRoute';
import Layout from './components/layout/Layout';

import PatientForm from './pages/patient/PatientForm';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientExams from './pages/patient/PatientExams';
import ExamResult from './pages/patient/ExamResult';

import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorForm from './pages/doctor/DoctorForm';
import AppointmentDetail from './pages/doctor/AppointmentDetail';

import AdminPatients from './pages/admin/AdminPatients';
import AdminPatientDetails from './pages/admin/AdminPatientDetails';
import AdminUsers from './pages/admin/AdminUsers';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminForm from './pages/admin/AdminForm';
import AdminReports from './pages/admin/AdminReports';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/me/edit" element={<EditProfile />} />

          <Route path="/agendar-consulta" element={<PatientForm />}/>
          <Route path="/minhas-consulta" element={<PatientAppointments />}/>
          <Route path="/exames" element={<PatientExams />}/>
          <Route path="/exames/resultado/:examId" element={<ExamResult />} />
          <Route path="/medico/remarcar-consulta" element={<DoctorForm />}/>
          <Route path="/medico/minhas-consultas" element={<DoctorAppointments />}/>

          <Route
            path="/appointment/:id"
            element={
              <PrivateRoute allowedRoles={['admin', 'doctor']}>
                <AppointmentDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/patients"
            element={
              <PrivateRoute allowedRoles={['admin', 'doctor']}>
                <AdminPatients />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/agendar-consulta"
            element={
              <PrivateRoute allowedRoles={['admin', 'doctor']}>
                <AdminForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/patients/:patientId"
            element={
              <PrivateRoute allowedRoles={['admin', 'doctor']}>
                <AdminPatientDetails />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin/users"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminUsers />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin/appointments"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminAppointments />
              </PrivateRoute>
            }
          />
          <Route 
            path="/admin/reports"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminReports />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
