const express = require('express');
const router = express.Router();

const auth_controller = require('../controllers/authController');

// Add New User...
router.post('/', auth_controller.auth_user);


module.exports = router;