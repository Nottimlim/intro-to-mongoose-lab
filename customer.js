const mongoose = require('mongoose'); // Importing mongoose

// Defining the Customer schema
const customerSchema = new mongoose.Schema({
  name: String, // Customer's name
  age: Number   // Customer's age
});

// Creating the Customer model
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer; // Exporting the model
