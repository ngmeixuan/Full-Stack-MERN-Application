// To handle incoming requests and send back responses

// Create an Express Router instance
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user-controller");

/*
 *   APP Routes
 */

// List users
router.route("/user/list").get(UserController.listUsers);

// Create a user
router.route("/user").post(UserController.createUser);

// Retrive a user by ID and Update the user
router
  .route("/user/:id")
  .get(UserController.getUserById)
  .patch(UserController.updateUser);

// Delete a user by ID
router.delete("/user/:id", UserController.deleteUser);

// Add test data
//router.post('/addtestdata', UserController.addTestData);

module.exports = router;
