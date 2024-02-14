const express = require('express')
const router = express.Router()
const {
  getAllProduct,
  storeProduct,
  getDetailProduct,
  updateProduct,
  destroyProduct,
} = require('../controllers/controllerProduct')

router.get('/', getAllProduct)
router.get('/:id', getDetailProduct)
router.put('/update/:id', updateProduct)
router.post('/create', storeProduct)
router.delete('/delete/:id', destroyProduct)

module.exports = router
