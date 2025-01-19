import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './components/MainLayout/MainLayout';
import Login from './components/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Sales from './pages/SalesList/SalesList';
import Users from './pages/Users/Users';
import Settings from './pages/Serrings/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Login/Register';
function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Sales />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute requiredRole="admin">
            <MainLayout>
              <Users />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
    </Routes>
  );
};


export default App;

