// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddressList from './components/AddressList';
import AddAddress from './components/AddAddress';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
        <Routes>
          <Route exact path="/" element={<AddressList />} />
          <Route exact path="/add" element={<AddAddress />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
