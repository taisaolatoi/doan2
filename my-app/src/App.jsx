import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import Approute from './route/approute';
import Adminroute from './route/adminroute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="FileMain">
      <Router>
        <ToastContainer/>
        <Routes>
          <Route path="/admin/*" element={
            <Adminroute />
          } />

          <Route path="/*" element={
            <Approute />
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
