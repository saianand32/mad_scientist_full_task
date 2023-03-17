const router = require('express').Router();
const {fileUploadController, getAllFilesController, getPdfByIdController, deleteAllPdfsController, deleteByIdController} = require('../controllers/FileController')
const upload = require('./middleware/upload');



router.post('/upload', upload.single('pdf'),fileUploadController);
router.get('/getfilebyid/:id',getPdfByIdController);
router.get('/getAllFiles', getAllFilesController);

router.delete('/deleteAll', deleteAllPdfsController);
router.delete('/deleteById/:id', deleteByIdController)

module.exports = router;
