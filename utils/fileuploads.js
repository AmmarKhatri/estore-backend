const multer  = require('multer')

const fileStorageSystem = multer.diskStorage({})

const upload = multer({
    storage: fileStorageSystem
})

module.exports = upload;



