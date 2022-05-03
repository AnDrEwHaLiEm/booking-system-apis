const multer = require('multer');


const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, `${__dirname}/../../public/image`)
        },
        filename: function(req, file, cb) {
            const fileName = `${Date.now()}_ ${file.originalname}`;
            cb(null, fileName);
        }
    })
    /*
    const fileFilter = async(req, file, cb) => {
        if (file.mimetype.includes('image/')) {
            req.file = file
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }*/

const uploadWithStorage = multer({ storage });

module.exports = uploadWithStorage