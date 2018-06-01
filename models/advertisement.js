const Joi = require('joi');
const mongoose = require('mongoose');
const { locationSchema } = require('./location');
const { jobTypeSchema } = require('./jobtype');

const Advertisement = mongoose.model('Advertisement', new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    jobTitle: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    jobDetail: {
        type: String,
        required: true,
        minlength: 10
    },
    noOfPosition: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },
    jobType: {
        type: jobTypeSchema,
        required: true
    },
    salary: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    location: {
        type: locationSchema,
        required: true
    },
    publishDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    expireDate: {
        type: Date
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        unique: true
    }
}));

function validateAdvertisement(advertisement) {
    const schema = {
        companyName: Joi.string().min(3).required(),
        jobTitle: Joi.string().min(3).required(),
        jobDetail: Joi.string().min(10).required(),
        noOfPosition: Joi.number().min(1).required(),
        jobTypeId: Joi.objectId().required(),
        salary: Joi.string().min(3).required(),
        locationId: Joi.objectId().required(),
        email: Joi.string().min(5).required().email()
    };
    return Joi.validate(advertisement, schema);
}

exports.Advertisement = Advertisement;
exports.validate = validateAdvertisement;
