const multer = require('multer')
const { uuid } = require('uuidv4');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'public/video')
    },
    filename: (req, file, cb) =>{
        cb(null, `${uuid()}.mp4`);
    }
})
const types = ['video/mp4', 'video/webm', 'video/mov', 'video/ogg', 'video/quicktime']

const fileFilter = (req, file, cb) => {
    console.log(file);
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only Video is Allowed'))
    }
}

module.exports = multer({storage, fileFilter})