// AddAddress.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navigation from './Navigation';

const AddAddress = () => {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/addresses', formData)
      .then(() => {
        toast.success('Address added successfully!');
        nav('/');
      })
      .catch((error) => {
        console.error('Error adding address:', error);
        toast.error('An error occurred while adding the address. Please try again.');
      });
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <h2 className='text-4xl font-bold mb-6 text-center'>Add Address</h2>
      <Navigation />
      <form onSubmit={handleSubmit} className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Name:</label>
          <input type="text" name="name" onChange={handleChange} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
          <input type="email" name="email" onChange={handleChange} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Contact:</label>
          <input type="text" name="contact" onChange={handleChange} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>Address:</label>
          <input type="text" name="address" onChange={handleChange} required className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
        </div>
        <div className='flex items-center justify-between'>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Add Address</button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
