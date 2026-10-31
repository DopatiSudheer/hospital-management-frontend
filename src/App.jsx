import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import Billing from './pages/Billing';
import Prescriptions from './pages/Prescriptions';
import Medicines from './pages/Medicines';
import LabTests from './pages/LabTests';
import Reports from './pages/Reports';
import NotificationsPage from './pages/NotificationsPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileCheck from './pages/ProfileCheck';
import CompleteProfile from './pages/CompleteProfile';
import ChangePassword from './pages/ChangePassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/change-password" element={<ChangePassword />} />

        <Route
          path="/profile-check"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <ProfileCheck />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complete-profile"
          element={
            <ProtectedRoute allowedRoles={["PATIENT"]}>
              <CompleteProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR", "PATIENT"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="patients"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]}>
                <Patients />
              </ProtectedRoute>
            }
          />

          <Route
            path="doctors"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Doctors />
              </ProtectedRoute>
            }
          />

          <Route
            path="appointments"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR", "PATIENT"]}>
                <Appointments />
              </ProtectedRoute>
            }
          />

          <Route
            path="billing"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Billing />
              </ProtectedRoute>
            }
          />

          <Route
            path="prescriptions"
            element={
              <ProtectedRoute allowedRoles={["ADMIN" , "DOCTOR"]}>
                <Prescriptions />
              </ProtectedRoute>
            }
          />

          <Route
            path="medicines"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]}>
                <Medicines />
              </ProtectedRoute>
            }
          />

          <Route
            path="lab-tests"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR"]}>
                <LabTests />
              </ProtectedRoute>
            }
          />

          <Route
            path="reports"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <Reports />
              </ProtectedRoute>
            }
          />

          <Route
            path="notifications"
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "DOCTOR", "PATIENT"]}>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
        </Route>
            
        
      </Routes>
    </Router>
  );
}

export default App;