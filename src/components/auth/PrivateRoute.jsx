import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthProvider'

export default function PrivateRoute() {
  const data = useAuth();

  if (data.user == undefined || data.user == null || data.user == '' || Object.values(data.user).length == 0) {
    return (
      <Navigate to="/loginPage"></Navigate>
    );
  }

  return (
    <Outlet></Outlet>
  );
}
