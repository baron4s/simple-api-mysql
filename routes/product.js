const express = require('express')
const router = express.Router()
const { upload } = require('../utils/fileUpload')
const {
  getAllProduct,
  storeProduct,
  getDetailProduct,
  updateProduct,
  destroyProduct,
} = require('../controllers/controllerProduct')
const {
  authMiddleware,
  permissionUser,
} = require('../middleware/userMiddleware')

router.get('/', getAllProduct)
router.get(
  '/:id',
  authMiddleware,
  permissionUser('admin', 'user'),
  getDetailProduct,
)
router.put(
  '/update/:id',
  authMiddleware,
  permissionUser('admin'),
  upload.single('image'),
  updateProduct,
)
router.post(
  '/create',
  authMiddleware,
  permissionUser('admin'),
  upload.single('image'),
  storeProduct,
)
router.delete(
  '/delete/:id',
  authMiddleware,
  permissionUser('admin'),
  destroyProduct,
)

module.exports = router
