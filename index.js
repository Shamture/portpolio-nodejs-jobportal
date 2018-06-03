require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const locations = require('./routes/locations');
const jobTypes = require('./routes/jobtypes');
const advertisements = require('./routes/advertisements');
const users = require('./routes/users');
const auth = require('./routes/auths');

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/jobportal',
    level: 'error'
});

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/jobportal')
    .then(() => console.log('Connected to db'))
    .catch(err => console.error('Could not connected to database'));

app.use(express.json());
app.use('/api/locations', locations);
app.use('/api/jobTypes', jobTypes);
app.use('/api/advertisements', advertisements);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



