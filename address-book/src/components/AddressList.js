import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import Modal from './Modal';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState(null);

  // handle for fetching addresses on page load
  useEffect(() => {
    axios.get('http://localhost:5000/api/addresses').then((response) => {
      setAddresses(response.data);
    });
  }, []);

  // handle for deleting address
  const handleDelete = (addressId) => {
    axios
      .delete(`http://localhost:5000/api/addresses/${addressId}`)
      .then(() => {
        return axios.get('http://localhost:5000/api/addresses');
      })
      .then((response) => {
        setAddresses(response.data);
        setIsDeleteModalOpen(false);
        setDeleteAddressId(null);
      })
      .catch((error) => {
        console.error('Error deleting address:', error);
        alert('An error occurred while deleting the address. Please try again.');
      });
  };

  // handle for setting address to be updated
  const handleEdit = (address) => {
    setSelectedAddress(address);
    setIsUpdateModalOpen(true);
  };

  // handle for updating address
  const handleUpdate = (updatedAddress) => {
    axios
      .put(`http://localhost:5000/api/addresses/${updatedAddress._id}`, updatedAddress)
      .then(() => {
        return axios.get('http://localhost:5000/api/addresses');
      })
      .then((response) => {
        setAddresses(response.data);
        setSelectedAddress(null);
        setIsUpdateModalOpen(false);
      })
      .catch((error) => {
        console.error('Error updating address:', error);
        alert('An error occurred while updating the address. Please try again.');
      });
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <h2 className='text-4xl font-bold mb-6 text-center'>Address Book</h2>
      <Navigation />
      {isUpdateModalOpen && selectedAddress && (
        <Modal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onSubmit={() => handleUpdate(selectedAddress)}
          address={selectedAddress}
          setAddress={setSelectedAddress}
        />
      )}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this address?</p>
            <div className="flex space-x-4 mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDelete(deleteAddressId)}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeleteAddressId(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ul className='w-full max-w-2xl'>
        {addresses.map((address) => (
          <div className='bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center' key={address._id}>
            <div>
              <h5 className='text-lg font-semibold'>Name: {address.name}</h5>
              <h5 className='text-lg font-semibold'>Email: {address.email}</h5>
              <h5 className='text-lg font-semibold'>Contact: {address.contact}</h5>
              <h5 className='text-lg font-semibold'>Address: {address.address}</h5>
            </div>
            <div className='flex space-x-2'>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => {
                  setIsDeleteModalOpen(true);
                  setDeleteAddressId(address._id);
                }}
              >
                <Trash className='w-6 h-6' />
              </button>
              <button
                className="text-blue-600 hover:text-blue-800"
                onClick={() => handleEdit(address)}
              >
                <PencilSquare className='w-6 h-6' />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default AddressList;
