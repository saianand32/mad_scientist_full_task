const cors = require('cors')
const express = require("express");
const FileRoutes = require('./routes/FileRoute')


const connectToMongo = require('./db');
require("dotenv").config();


const app = express();

connectToMongo()

app.use(cors());
app.use(express.json());


app.use('/api', FileRoutes)
  

app.listen(8000, () => {
  console.log("Server started on port "+ 8000);
});
