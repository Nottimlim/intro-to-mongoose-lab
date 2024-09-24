require('dotenv').config(); // loading environment variables from .env file
const prompt = require('prompt-sync')(); // importing prompt-sync for user input
const mongoose = require('mongoose'); // import mongoose
const Customer = require('./customer');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected');
        } catch (err) {
    console.error('could not connect mf', err);
}
};

connect();


