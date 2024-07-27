import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import Address from './models/address.js'; // Make sure to include .js extension

const app = express();

// Body parser used for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/addressbook')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Get route for fetching addresses from database
app.get('/api/addresses', async (req, res) => {
    try {
        const addresses = await Address.find();
        res.json(addresses);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching addresses: ' + err.message });
    }
});

// Get route for fetching a specific address by ID
app.get('/api/addresses/:id', async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (address) {
            res.json(address);
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (err) {
        res.status(500).json({ error: `Error fetching address: ${err.message}` });
    }
});

// Post route for storing new address
app.post('/api/addresses', async (req, res) => {
    try {
        const newAddress = new Address(req.body);
        const savedAddress = await newAddress.save();
        res.status(201).json(savedAddress);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation Error: ' + err.message });
        } else if (err.code === 11000) { // MongoDB duplicate key error
            const field = err.message.includes('email') ? 'email' : 'contact';
            res.status(400).json({ error: `Duplicate ${field} error: ${err.message}` });
        } else {
            res.status(500).json({ error: 'Error saving address: ' + err.message });
        }
    }
});

// Put route for updating address with new data
app.put('/api/addresses/:id', async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (updatedAddress) {
            res.json(updatedAddress);
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: 'Validation Error: ' + err.message });
        } else if (err.code === 11000) { // MongoDB duplicate key error
            const field = err.message.includes('email') ? 'email' : 'contact';
            res.status(400).json({ error: `Duplicate ${field} error: ${err.message}` });
        } else {
            res.status(500).json({ error: 'Error updating address: ' + err.message });
        }
    }
});

// Delete route for deleting address with specified id
app.delete('/api/addresses/:id', async (req, res) => {
    try {
        const result = await Address.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: 'Address deleted' });
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (err) {
        res.status(500).json({ error: `Error deleting address: ${err.message}` });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
});
