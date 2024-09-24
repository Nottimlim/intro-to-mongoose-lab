const mongoose = require('mongoose'); // Importing mongoose

// Defining the Student schema
const studentSchema = new mongoose.Schema({
  name: String, // Student's name
  age: Number,   // Student's age
  course: String, // Student's course
});

// Creating the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student; // Exporting the model
