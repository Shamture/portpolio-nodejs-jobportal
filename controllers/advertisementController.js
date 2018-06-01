const mongoose = require('mongoose');

const { Advertisement, validate } = require('../models/advertisement');
const { Location } = require('../models/location');
const { JobType } = require('../models/jobtype');

// Get All Advertisements...
exports.advertisement_list = async (req, res) => {
    const advertisements = await Advertisement.find().sort('jobTitle');
    res.send(advertisements);
};

// Get Advertisement by ID...
exports.get_advertisement_by_id = async (req, res) => {
    const advertisement = await Advertisement.findById(req.params.id);
    if (!advertisement) return res.status(404).send('Advertisement not found.');
    res.send(advertisement);
};

// Add New Advertisement...
exports.add_new_advertisement = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = await Location.findById(req.body.locationId);
    if (!location) return res.status(400).send('Invalid location.');

    const jobType = await JobType.findById(req.body.jobTypeId);
    if (!jobType) return res.status(400).send('Invalid Job Type.');

    const advertisement = new Advertisement({
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobDetail: req.body.jobDetail,
        noOfPosition: req.body.noOfPosition,
        jobType: {
            _id: jobType._id,
            jobType: jobType.jobType
        },
        salary: req.body.salary,
        location: {
            _id: location._id,
            location: location.location
        },
        email: req.body.email
     });

    advertisement = await advertisement.save();

    res.send(advertisement);
};

// Update a Advertisement...
exports.update_an_advertisement = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = await Location.findById(req.body.locationId);
    if (!location) return res.status(400).send('Invalid location.');

    const jobType = await JobType.findById(req.body.jobTypeId);
    if (!jobType) return res.status(400).send('Invalid Job Type.');

    const advertisement = await Advertisement.findByIdAndUpdate(req.params.id,
    {
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobDetail: req.body.jobDetail,
        noOfPosition: req.body.noOfPosition,
        jobType: {
            _id: jobType._id,
            jobType: jobType.jobType
        },
        salary: req.body.salary,
        location: {
            _id: location._id,
            location: location.location
        },
        email: req.body.email
    }, { new: true});

    if (!advertisement) return res.status(404).send('Advertisement not found.');
    res.send(advertisement);
};

// Delete an Advertisement
exports.delete_an_advertisement = async (req, res) => {
    const advertisement = await Advertisement.findByIdAndRemove(req.params.id);
    if (!advertisement) return res.status(404).send('Advertisement not found.');
    res.send(advertisement);
};


