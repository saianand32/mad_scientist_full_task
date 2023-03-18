const router = require('express').Router();
const {fileUploadController, getAllFilesController, getPdfByIdController, deleteAllPdfsController, deleteByIdController} = require('../controllers/FileController')
const upload = require('./middleware/upload');


router.post('/upload', upload.single('pdf'),fileUploadController);
router.get('/getAllFiles', getAllFilesController);
router.delete('/deleteById/:id', deleteByIdController)

router.get('/getfilebyid/:id',getPdfByIdController);
router.delete('/deleteAll', deleteAllPdfsController);

module.exports = router;
