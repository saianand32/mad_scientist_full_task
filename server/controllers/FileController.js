const FileModel = require('../models/FileModel');
const { PDFDocument } = require('pdf-lib');
const MAX_FILE_SIZE = 6 * 1024 * 1024;

async function compressPDF(pdfBuffer) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width, height } = page.getSize();
    const scaleFactor = Math.sqrt(MAX_FILE_SIZE / (width * height));
    if (scaleFactor < 1) {
      page.scale(scaleFactor);
    }
  }
  return pdfDoc.save();
}

module.exports.fileUploadController = async (req, res, next) => {
  try {
    const myFile = req.file;
    const size = myFile.size || myFile.buffer.length;
    const contentType = myFile.mimetype || 'application/pdf';
    const filename = myFile.originalname || `file-${Date.now()}.pdf`;

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

    res.status(200).json({ filename, message: 'File uploaded successfully.' });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.getAllFilesController = async (req, res, next) => {
  try {
    const files = await FileModel.find({}, {_id:1, filename:1})
    res.json({files})
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.getPdfByIdController = async (req, res, next) => {
  try {
    const file = await FileModel.findOne({_id:req.params.id})
    res.json({status:true, file})
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.deleteAllPdfsController = async (req, res, next) => {
  try {
    const file = await FileModel.deleteMany({})
    res.json({status:true, msg:"deleted all"})
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.deleteByIdController = async (req, res, next) => {
  try {
    const file = await FileModel.deleteOne({_id: req.params.id})
    res.json({status:true, msg:"deleted single pdf"})
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};
