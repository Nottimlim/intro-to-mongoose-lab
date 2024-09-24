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

// Function to create a new customer
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

// Function to update a customer
const updateStudent = async () => {
    const id = prompt('Enter the student ID to update: ');
    const name = prompt('What is the student\'s new name? ');
    const age = parseInt(prompt('What is the student\'s new age? '));
    const course = prompt('What is the student\'s new course? ');
    await Student.findByIdAndUpdate(id, { name, age, course });
    console.log('Student updated successfully');
};

// Function to delete a customer
const deleteStudent = async () => {
    const id = prompt('Enter the student ID to remove: ');
    await Student.findByIdAndDelete(id);
    console.log('Student removed successfully');
};

const main = async () => {
    await connect();
    while (true) {
        //Display Menu Options
        console.log('What would you like to do?');
        console.log('1. Add a new student');
        console.log('2. List all students');
        console.log('3. Update a student');
        console.log('4. Delete a student');
        console.log('5. Quit');

        // Get user's choice
        const choice = prompt('Number of action to run: ');

        // Handle user's choice
        if (choice === '1') {
            await createStudent();
          } else if (choice === '2') {
            await viewStudents();
          } else if (choice === '3') {
            await updateStudent();
          } else if (choice === '4') {
            await deleteStudent();
          } else if (choice === '5') {
            console.log('Exiting...');
            mongoose.connection.close();
            break;
          } else {
            console.log('Invalid choice, please try again.');
          }
    }
}

main();