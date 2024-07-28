// AddressList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navigation from './Navigation';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/addresses').then((response) => {
      setAddresses(response.data);
    });
  }, []);

  const handleDelete = (addressId) => {
    axios
      .delete(`http://localhost:5000/api/addresses/${addressId}`)
      .then(() => {
        return axios.get('http://localhost:5000/api/addresses');
      })
      .then((response) => {
        setAddresses(response.data);
        toast.success('Address deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting address:', error);
        toast.error('An error occurred while deleting the address. Please try again.');
      });
  };

  const handleEdit = (address) => {
    setSelectedAddress(address);
  };

  const handleUpdate = (updatedAddress) => {
    axios
      .put(`http://localhost:5000/api/addresses/${updatedAddress._id}`, updatedAddress)
      .then(() => {
        return axios.get('http://localhost:5000/api/addresses');
      })
      .then((response) => {
        setAddresses(response.data);
        setSelectedAddress(null);
        toast.success('Address updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating address:', error);
        toast.error('An error occurred while updating the address. Please try again.');
      });
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <h2 className='text-4xl font-bold mb-6 text-center'>Address Book</h2>
      <Navigation />
      {selectedAddress && (
        <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md mb-6'>
          <h2 className='text-2xl font-bold mb-4'>Edit Address</h2>
          <form onSubmit={() => handleUpdate(selectedAddress)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
                value={selectedAddress.name}
                onChange={(e) =>
                  setSelectedAddress({
                    ...selectedAddress,
                    name: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                value={selectedAddress.email}
                onChange={(e) =>
                  setSelectedAddress({
                    ...selectedAddress,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone"
                value={selectedAddress.contact}
                onChange={(e) =>
                  setSelectedAddress({
                    ...selectedAddress,
                    contact: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="address"
                value={selectedAddress.address}
                onChange={(e) =>
                  setSelectedAddress({
                    ...selectedAddress,
                    address: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Update Address
              </button>
            </div>
          </form>
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
                onClick={() => handleDelete(address._id)}
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
