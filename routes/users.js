const express = require('express')
const router = express.Router()
const {
  register,
  login,
  logoutUser,
  getMyUser,
} = require('../controllers/controllerUser')
const { authMiddleware } = require('../middleware/userMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logoutUser)
router.get('/me', authMiddleware, getMyUser)
module.exports = router
