
const { Location, validate } = require('../models/location');


exports.location_list = async (req, res) => {
    throw new Error('Could not get locations');
    const locations = await Location.find().sort('location');
    res.send(locations);  
};

exports.add_new_location = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const loc = await Location.findOne({ location: req.body.location });
    if (loc) return res.status(401).send('Location already exists');

    let location = new Location({ location: req.body.location });
    location = await location.save();

    res.send(location);
};

exports.edit_location = async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const location = await Location.findByIdAndUpdate(req.params.id, 
        { location: req.body.location}, { new: true });

    if (!location) return res.status(404).send('The location with given ID was not found');
    res.send(location);
};

exports.get_specific_location = async (req, res) => {
    const location = await Location.findById(req.params.id);

    if (!location) return res.status(404).send('The location with given ID was not found');
    res.send(location);
};

exports.delete_a_location = async (req, res) => {
    const location = await Location.findByIdAndRemove(req.params.id);
    if (!location) return res.status(404).send('The location with given ID was not found');
    res.send(location);
};
