const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');

//Get User...
router.get('/me', auth, user_controller.get_user);

// Add New User...
router.post('/', user_controller.add_new_user);


module.exports = router;