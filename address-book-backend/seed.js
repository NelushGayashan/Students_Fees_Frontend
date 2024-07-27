import mongoose from 'mongoose';
import Address from './models/address.js'; // Ensure correct import path

const dbURL = 'mongodb://localhost:27017/addressbook'; // Local MongoDB instance

const seedDB = async () => {
    try {
        await mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        // Clear existing data
        await Address.deleteMany({});

        // Seed new data
        const addresses = [
            { name: 'John Doe', email: 'john.doe@example.com', contact: '1234567890', address: '789 Maple St, Townsville, USA' },
            { name: 'Jane Smith', email: 'jane.smith@example.com', contact: '2345678901', address: '101 Pine St, Rivertown, USA' },
            { name: 'Michael Johnson', email: 'michael.johnson@example.com', contact: '3456789012', address: '202 Oak St, Metropolis, USA' },
            { name: 'Emily Davis', email: 'emily.davis@example.com', contact: '4567890123', address: '303 Cedar Ave, Smallville, USA' },
            { name: 'William Brown', email: 'william.brown@example.com', contact: '5678901234', address: '404 Birch Rd, Lakeview, USA' },
            { name: 'Sophia Wilson', email: 'sophia.wilson@example.com', contact: '6789012345', address: '505 Spruce St, Hilltown, USA' },
            { name: 'James Lee', email: 'james.lee@example.com', contact: '7890123456', address: '606 Fir Ave, Westwood, USA' },
            { name: 'Olivia Martinez', email: 'olivia.martinez@example.com', contact: '8901234567', address: '707 Willow Rd, Eastland, USA' },
            { name: 'Liam Garcia', email: 'liam.garcia@example.com', contact: '9012345678', address: '808 Pine St, Riverdale, USA' },
            { name: 'Emma Rodriguez', email: 'emma.rodriguez@example.com', contact: '0123456789', address: '909 Maple Ave, Meadowbrook, USA' },
            { name: 'Noah Anderson', email: 'noah.anderson@example.com', contact: '1234509876', address: '1010 Cedar Rd, Parkside, USA' },
            { name: 'Ava Thompson', email: 'ava.thompson@example.com', contact: '2345610987', address: '1111 Elm St, Lakeside, USA' },
            { name: 'Mason Scott', email: 'mason.scott@example.com', contact: '3456721098', address: '1212 Oak Ave, Brookside, USA' },
            { name: 'Isabella White', email: 'isabella.white@example.com', contact: '4567832109', address: '1313 Birch Rd, Riverview, USA' },
            { name: 'Ethan Lewis', email: 'ethan.lewis@example.com', contact: '5678943210', address: '1414 Spruce St, Highland, USA' },
            { name: 'Mia Harris', email: 'mia.harris@example.com', contact: '6789054321', address: '1515 Willow Ave, Hillcrest, USA' },
            { name: 'Alexander Clark', email: 'alexander.clark@example.com', contact: '7890165432', address: '1616 Pine Rd, Glenwood, USA' },
            { name: 'Charlotte Hall', email: 'charlotte.hall@example.com', contact: '8901276543', address: '1717 Maple St, Ridgeview, USA' },
            { name: 'Benjamin Young', email: 'benjamin.young@example.com', contact: '9012387654', address: '1818 Cedar Ave, Forestville, USA' },
            { name: 'Amelia Allen', email: 'amelia.allen@example.com', contact: '0123498765', address: '1919 Elm Rd, Crestwood, USA' },
            { name: 'Daniel King', email: 'daniel.king@example.com', contact: '1234509876', address: '2020 Oak St, Oakwood, USA' }
        ];

        await Address.insertMany(addresses);
        console.log('Database seeded successfully');
    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
