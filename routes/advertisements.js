
const express = require('express');
const router = express.Router();

const advertisement_controller = require('../controllers/advertisementController');

// Get a list of Advertisements...
router.get('/', advertisement_controller.advertisement_list);

// Get Advertisement by ID
router.get('/:id', advertisement_controller.get_advertisement_by_id);

// Add new Advertisement..
router.post('/', advertisement_controller.add_new_advertisement);

// Update a Advertisement...
router.put('/:id', advertisement_controller.update_an_advertisement);

// Delete a Advertisement
router.delete('/:id', advertisement_controller.delete_an_advertisement);

module.exports = router;