const multer  = require('multer')
const path = require("node:path");
const absolutePath = path.resolve()


const uploadPostImage = (destination) => {
    const directory =  path.join(absolutePath, destination)

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, directory)
        },
        filename: function (req, file, cb) {
          const filename = file.fieldname + '_' + Date.now() + path.extname(file.originalname)
          cb(null, filename)
        }
      })


    const upload = multer({ storage })
    return upload;
}
module.exports = uploadPostImage

