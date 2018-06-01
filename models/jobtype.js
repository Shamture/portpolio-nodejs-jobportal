const Joi = require('joi');
const mongoose = require('mongoose');

const jobTypeSchema = new mongoose.Schema({
    jobType: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
});

const JobType = mongoose.model('JobType', jobTypeSchema);

function validateJobType(jobType) {
    const schema = {
        jobType: Joi.string().min(3).required()
    };
    return Joi.validate(jobType, schema);
}

exports.jobTypeSchema = jobTypeSchema;
exports.JobType = JobType;
exports.validate = validateJobType;
