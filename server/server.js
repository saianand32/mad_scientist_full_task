const cors = require('cors')
const express = require("express");
const multer = require("multer");
const FileModel = require("./models/FileModel");
const connectToMongo = require('./db');
require("dotenv").config();
const MAX_FILE_SIZE = 6 * 1024 * 1024

const app = express();

connectToMongo()

app.use(cors());
app.use(express.json());

const upload = multer({ limits: { fileSize: MAX_FILE_SIZE } });

app.post('/api/upload', upload.single('pdf'), async (req, res) => {
    try {
      const myFile = req.file;
      console.log((myFile.size))
      const size = myFile.size || myFile.buffer.length;
      const contentType = myFile.mimetype || 'application/pdf';
      const filename = myFile.originalname || `file-${Date.now()}.pdf`;
      console.log(size+" "+contentType+" "+filename)
  
      if (size > MAX_FILE_SIZE) {
        throw new Error('File size is too large.');
      }
  
      const compressedBuffer = size <= MAX_FILE_SIZE ? myFile.buffer : await compressPDF(myFile.buffer);
  
      const newFile = await FileModel.create({
        data: compressedBuffer,
        size,
        contentType,
        filename,
      });
  
      res.status(200).json({ message: 'File uploaded successfully.' });
    } catch (err) {
      console.error(err);
      res.status(400).send({ error: err.message });
    }
  });
  

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
