const multer  = require('multer')

const fileStorageSystem = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, 'images/')
    },
    filename:(req,file,cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: fileStorageSystem
})

module.exports = upload;



