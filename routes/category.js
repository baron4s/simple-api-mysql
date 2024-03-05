const express = require('express')
const router = express.Router()
const {
  getAllCategory,
  getDetailCategory,
  storeCategory,
  updateCategory,
  destroyCategory,
} = require('../controllers/controllerCategory')

router.get('/', getAllCategory)
router.get('/:id', getDetailCategory)
router.post('/create', storeCategory)
router.post('/update/:id', updateCategory)
router.post('/delete/:id', destroyCategory)

module.exports = router
