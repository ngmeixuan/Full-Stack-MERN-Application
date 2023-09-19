// To define the schema for user collection in MongoDB database

// Import the mongoose library
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

// Define a function to validate email format
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

// Define the user schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Invalid email address format'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    dob: { 
        type: Date,
        required: true
    }, 
    gender: {
        type: String,
        enum: ['MALE', 'FEMALE', 'UNDISCLOSED'],
        required: true
    }
});

// Create the User model using user schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;