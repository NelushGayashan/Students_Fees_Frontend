// Navigation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleFill, JournalText } from 'react-bootstrap-icons';

const Navigation = () => {
  const nav = useNavigate();

  // route for home page
  const gotoHome = () => {
    nav('/');
  };

  // route for add address page
  const gotoAdd = () => {
    nav('/add');
  };

  return (
    <nav className='flex space-x-4 p-4 bg-white shadow-md rounded-lg'>
      <button 
        className='text-gray-800 hover:text-gray-600 transition-colors duration-300'
        onClick={gotoHome}
      >
        <JournalText className='w-8 h-8' />
      </button>
      <button 
        className='text-gray-800 hover:text-gray-600 transition-colors duration-300'
        onClick={gotoAdd}
      >
        <PlusCircleFill className='w-8 h-8' />
      </button>
    </nav>
  );
};

export default Navigation;
