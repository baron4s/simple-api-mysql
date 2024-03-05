const multer = require('multer')

const FILE_TYPE = {
  'image/png': 'png',
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidFormat = FILE_TYPE[file.mimetype]
    let uploadError = new Error('invalid image type')
    if (isValidFormat) {
      uploadError = null
    }
    cb(uploadError, 'public/uploads')
  },
  filename: function (req, file, cb) {
    const extension = FILE_TYPE[file.mimetype]
    const uniqueSuffix = Date.now() + file.fieldname + '.' + extension
    cb(null, uniqueSuffix)
  },
})

exports.upload = multer({ storage: storage })
