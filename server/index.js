const cors = require('cors');
const express = require("express");
const FileRoutes = require('./routes/FileRoute');
const connectToMongo = require('./db');
require("dotenv").config();

const app = express();

connectToMongo();

app.use(cors());

app.use(express.json());

// Add this middleware to set the Access-Control-Allow-Origin header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with the domain you want to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', FileRoutes);

app.listen(8000, () => {
  console.log(`Server started on port 8000`);
});
