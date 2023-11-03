import React from 'react';
import ReactDOM from 'react-dom/client';
import { Outlet, Route, BrowserRouter, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './Home';
import Login from './auth/Login'
import Register from './auth/Register'
import Profil from './dashboard/Profil'
import ListTourist from './dashboard/ListTour'
import DetailTour from './dashboard/DetailTour'
import Delete from './dashboard/DeleteTour'
import EditList from './dashboard/EditTour'
import AddTour from './dashboard/AddTourist'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Outlet />
        <Routes>
          <Route path="/home" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/list" element={<ListTourist />} />
          <Route path="/detail-list/:id" element={<DetailTour/>} />
          <Route path="/edit-tourist/:id" element={<EditList />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/add-tourist" element={<AddTour />} />
          <Route path="/delete-tourist/:id" element={<Delete />} />

          <Route path="*" element={<Login />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
