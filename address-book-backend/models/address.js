import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const addressSchema = new Schema({
    name: { type: String, required: true, maxlength: 25 },
    email: { type: String, required: true, match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'] },
    contact: { type: String, required: true, minlength: 10, maxlength: 10, match: [/^\d{10}$/, 'Contact number must be 10 digits'] },
    address: { type: String, required: true, maxlength: 1000 }
});

// Ensure you export the model as default
const Address = model('Address', addressSchema, 'addresses');
export default Address;
