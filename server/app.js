// Main file to set up the server, configure middleware, and define routes


const express = require('express');
const cors = require('cors');

// Load environment file
require('dotenv').config();

// Setup database connection
//require('./server/models/database');
const app = express();
const port = process.env.PORT || 5000;

// Configure middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// Define Routes
const routes = require('./routes/user-routes');
app.use('/', routes);

/*
app.get("/user", (req, res) => {
    const data = await User.find({});
    res.json(data);
});*/

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
