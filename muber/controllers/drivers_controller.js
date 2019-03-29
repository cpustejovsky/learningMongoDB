const Driver = require('../models/Driver');

module.exports = {
    //key:value pairs consisting of request handlers

    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    index(req, res, next) {
        const { lng, lat } = req.query; /* the `...?v=123456&coupon=yayayay` of a URL*/

        Driver.geoNear(
            {
                type: 'Point',
                coordinates: [lng, lat]
            },
            {
                spherical: true,
                maxDistance: 200000 /*meters*/
            }
        );
    },

    create(req, res, next) {
        const driverProps = req.body;

        Driver.create(driverProps)
            .then(driver => res.send(driver))
            .catch(next);
    },
    edit(req, res, next) {
        const driverId = req.params.id;
        const driverProps = req.body;

        Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
            .then(() => Driver.findbyId( {_id: driverId} ))
            .then(driver => res.send(driver))
            .catch(next);
    },
    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndDelete({ _id: driverId} )
            .then(driver => res.status(204).send(driver))
            .catch(next);
    }
};
