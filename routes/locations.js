const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();

const location_controller = require('../controllers/locationController');

// Get a list of locations...
router.get('/', auth, location_controller.location_list);

// Add new location..
router.post('/', auth, location_controller.add_new_location);

// Edit a location
router.put('/:id', location_controller.edit_location);

// Get specific location
router.get('/:id', location_controller.get_specific_location);

// Delete a location
router.delete('/:id', [auth, admin], location_controller.delete_a_location);

module.exports = router;