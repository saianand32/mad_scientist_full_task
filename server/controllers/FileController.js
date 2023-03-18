const FileModel = require("../models/FileModel");
const {compressPdf, getPdfBuffer } = require('../utils/utils')
const axios = require("axios");
const MAX_FILE_SIZE = 6 * 1024 * 1024;


module.exports.fileUploadController = async (req, res, next) => {
  try {
    const myFile = req.file;
    const size = myFile.size || myFile.buffer.length;
    const contentType = myFile.mimetype || "application/pdf";
    const filename = myFile.originalname || `file-${Date.now()}.pdf`;

    if (size <= MAX_FILE_SIZE) {
      await FileModel.create({
        data: myFile.buffer,
        size,
        contentType,
        filename,
      });
      res.status(200).json({
        status: true,
        filename,
        message: "File uploaded successfully.",
      });
    } else {
      const compressedFile = await compressPdf(myFile.buffer);
      // console.log(compressedFile.Files[0].Url)
      if (compressedFile.Files[0].FileSize <= MAX_FILE_SIZE) {
      getPdfBuffer(compressedFile.Files[0].Url)
        .then(async(buffer) => {
          await FileModel.create({
            data: buffer,
            size,
            contentType,
            filename,
          });
          const compressedSize = (compressedFile.Files[0].FileSize)/ (1024*1024)
          res.status(200).json({status:true, message: `file compressed to ${compressedSize.toFixed(3)} Mb and uploaded successfully`})
        })
        .catch(error => {
          console.error(error);
        });
      } else {
        res.json({
          status: false,
          message: "file too large even after compressing",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message + "kooo" });
  }
};

module.exports.getAllFilesController = async (req, res, next) => {
  try {
    const files = await FileModel.find({}, { _id: 1, filename: 1 });
    res.json({ files });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.getPdfByIdController = async (req, res, next) => {
  try {
    const file = await FileModel.findOne({ _id: req.params.id });
    res.json({ status: true, file });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.deleteAllPdfsController = async (req, res, next) => {
  try {
    const file = await FileModel.deleteMany({});
    res.json({ status: true, msg: "deleted all" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};

module.exports.deleteByIdController = async (req, res, next) => {
  try {
    const file = await FileModel.deleteOne({ _id: req.params.id });
    res.json({ status: true, msg: "deleted single pdf" });
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: err.message });
  }
};
