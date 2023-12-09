require('dotenv').config();
const mongoose = require("mongoose").default;
const {fatalError} = require("./sharedUtils");

const dbURI = process.env.DB_URI;

mongoose.connect(dbURI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
    fatalError(err);
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
