require('dotenv').config(); // loading environment variables from .env file
const prompt = require('prompt-sync')(); // importing prompt-sync for user input
const mongoose = require('mongoose'); // import mongoose
const Student = require('./student'); // import customer

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Welcome to the General Assembly Database');
        } catch (err) {
    console.error('You can not enter General Assembly currently', err);
}
};

// function to create a new customer
const createStudent = async () => {
    const name = prompt('Enter the student\'s name: ');
    const age = parseInt(prompt('Enter the student\'s age: '));
    const course = prompt('Enter the student\'s course: ');
    const student = new Student({ name, age, course });
    await student.save();
    console.log('Student added successfully');
};

// Function to view all customers
const viewStudents = async () => {
    const students =  await Student.find();
    students.forEach(student => {
        console.log(`ID: ${student._id}, Name: ${student.name}, Age: ${student.age}, Course: ${student.course}`);
    });
};

// function to update a customer
const updateStudent = async () => {
    const id = prompt('Enter the student ID to update: ');
    const name = prompt('What is the student\'s new name? ');
    const age = parseInt(prompt('What is the student\'s new age? '));
    const course = prompt('What is the student\'s new course? ');
    await Student.findByIdAndUpdate(id, { name, age, course });
    console.log('Student updated successfully');
};

// function to delete a customer
const deleteStudent = async () => {
    const id = prompt('Enter the student ID to remove: ');
    await Student.findByIdAndDelete(id);
    console.log('Student removed successfully');
};

const actions = { // object to map user choices to actions
  '1': { name: 'Add a new student', action: createStudent }, // description of action and function executed
  '2': { name: 'List all students', action: viewStudents },
  '3': { name: 'Update a student', action: updateStudent },
  '4': { name: 'Delete a student', action: deleteStudent },
  '5': { 
      name: 'Quit', // description of action
      action: async () => { // function to execute
          console.log('Exiting...'); // message to console 
          await mongoose.connection.close(); // close mongodb connection
          return true; // return true to break out of main loop
      }}};

const main = async () => { // main function
  await connect(); // database connection
  while (true) { // start infinite loop
      console.log('What would you like to do?'); // user prompt 
      for (const [key, { name }] of Object.entries(actions)) { // iterate using object.entries(); method over the actions object and log each available action
          console.log(`${key}. ${name}`); //display thru syntax action number and name
      }

      const choice = prompt('Number of action to run: '); // prompt user to enter choice
      
      if (choice in actions) { // check if entered choice is valid
          try {
              if (await actions[choice].action()) break; // execute selected action and break loop if action returns true
          } catch (error) { // logs errors
              console.error('An error occurred:', error.message);
          }
      } else {
          console.log('Invalid choice, please try again.'); // invalid choice
      }}}

main();