// To handle user-related operations

require("../models/database");
const { json } = require("body-parser");
const User = require("../models/user");

// Create a user
const createUser = async (req, res) => {
  try {
    const { name, email, dob, gender } = req.body;

    // Create a new user using the User model
    const newUser = await User.create({ name, email, dob, gender });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating a user", error);
    res.status(500).json({ error: "Failed to create a user" });
  }
};

// Update a user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, dob, gender } = req.body;

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, dob, gender },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
};

// List users
const listUsers = async (req, res) => {
  try {
    // Retrieve all users from the User model
    const users = await User.find();

    if (!users || users.length == 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(users);
  } catch (error) {
    console.error("Error retrieving users: ", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

// Retrieve a user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID using the User model
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the user" });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ error: "Failed to delete the user" });
  }
};

module.exports = {
  getUserById,
  updateUser,
  listUsers,
  createUser,
  deleteUser,
};
