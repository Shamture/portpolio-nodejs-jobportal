const express = require('express');
const router = express.Router();

const jobType_controller = require('../controllers/jobTypeController');

// Get a list of job types...
router.get('/', jobType_controller.jobType_list);

// Add new job type..
router.post('/', jobType_controller.add_new_jobType);


module.exports = router;