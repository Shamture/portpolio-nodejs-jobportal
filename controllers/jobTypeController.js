const { JobType, validate } = require('../models/jobtype');

exports.jobType_list = async (req, res) => {
    const jobTypes = await JobType.find().sort('jobType');
    res.send(jobTypes);
};

exports.add_new_jobType = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let jobType = new JobType({ jobType: req.body.jobType });
    jobType = await jobType.save();

    res.send(jobType);
};





