/**
 * Controller for the user functionality
 * 
 * @returns this
 */

function userController() {

    var User = require('../models/user'); // get the user model

    /**
     * This Function creates a new user 
     * 
     * @param {any} req
     * @param {any} res
     * @param {any} next
     */
    this.createUser = function(req, res, next) {

        console.log("creating user...", req.params);

        // get coordinates [ <longitude> , <latitude> ]
        var coords = [];
        coords[0] = req.params.longitude || 0;
        coords[1] = req.params.latitude || 0;

        User.create({
            username: req.params.username,
            password: req.params.password,
            email: req.params.email,
            category: req.params.category,
            about: req.params.about || '',
            coordinates: coords,
            city: req.params.city,
            profilepic_url: 'img/placeholder.jpg',
            youtube_url: req.params.youtube || '',
            soundcloud_url: req.params.soundcloud || '',
            website_url: req.params.website || '',
            facebook_url: req.params.facebook || '',
            instagram_url: req.params.instagram || '',
            twitter_url: req.params.twitter || '',
            xing_url: req.params.xing || '',
            isArtist: req.params.isArtist || true,
        }, function(err, result) {
            if (err) {
                console.log(err);
                return res.send({
                    'error': err
                });
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                console.log('user: ', result)
                res.end(JSON.stringify(result));
            }
        });
    };

    this.findUserByToken = function(req, res, next) {
        User.findOne({
            email: req.params.token
        }, function(err, user) {
            if (err || user == null) {
                res.writeHead(403, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify({
                    error: "Invalid User"
                }));
            } else {
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                console.log('user: ', user)
                res.end(JSON.stringify(user));
            }
        })

        return next();
    };

    /**
     *  This function gets all users from the db
     * 
     * @param {any} req
     * @param {any} res
     * @param {any} next
     */
    this.getUsers = function(req, res, next) {

        User.find({}, function(err, result) {
            if (err) {
                console.log(err);
                return res.send({
                    'error': err
                });
            } else {
                return res.send({
                    'user Details': result
                });
            }
        });
    };

    /**
     *  This function returns all users within a given distance and category
     * 
     * @param {any} req
     * @param {any} res
     * @param {any} next
     */
    this.getUsersAround = function(req, res, next) {

        var dist = parseInt(req.params.distance) || 5; // maxdistance 
        var maxDistInMeters = dist * 1000; // convert km to meters
        var category = req.params.category; // category
        var email = req.params.token; // signed in user's email
        var coords = [parseFloat(req.params.longitude), parseFloat(req.params.latitude)] // coordinates

        // create the GeoJson Point-Object
        var point = {
            type: "Point",
            coordinates: coords
        };

        if (category != 'all categories' && category != '' && category != null) {
            // find users near with category
            User.geoNear(point, {
                    maxDistance: parseInt(maxDistInMeters),
                    distanceField: "dist.calculated",
                    query: {
                        category: category,
                        email: {
                            $ne: email
                        }
                    },
                    includeLocs: "dist.location",
                    spherical: true
                },
                function(err, users, stats) {
                    if (err) {
                        return res.json(500, err);
                    }
                    console.log("users: ", users)
                    console.log("stats: ", stats)
                    res.json(200, users);
                });
        } else {
            // find users near without category
            User.geoNear(point, {
                    maxDistance: parseInt(maxDistInMeters),
                    distanceField: "dist.calculated",
                    query: {
                        email: {
                            $ne: email
                        }
                    },
                    includeLocs: "dist.location",
                    num: 30, // limit the results
                    spherical: true
                },
                function(err, users, stats) {
                    if (err) {
                        console.log("users: ", users)
                        return res.json(500, err);
                    }
                    console.log("users: ", users)
                    console.log("stats: ", stats)
                    res.json(200, users);
                });
        }


    };

    // TODO: adapt function for needs

    // Update Details of User
    this.updateUserPosition = function(req, res, next) {
        var coords = [req.params.longitude, req.params.latitude]; // the new user location coordinates

        // find user with given email adress....
        User.findOne({
            email: req.params.email
        }, function(error, user) {
            if (error) {
                return res.send({
                    'error': error
                });
            } else {
                user.coordinates = coords;
                var promise = user.save();
                promise.then(function(data) {
                    res.send(user);
                    res.end(JSON.stringify('user saved'));
                });
            }
        });

    };

    /**
     * This function updates a user
     * 
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns updated user
     */
    this.updateUser = function(req, res, next) {

        return User.findById(req.params.userdata._id, function(err, user) {

            user.username = req.params.userdata.username;
            user.email = req.params.userdata.email;
            user.about = req.params.userdata.about;
            user.city = req.params.userdata.city;
            user.youtube_url = req.params.userdata.youtube_url;
            user.instagram_url = req.params.userdata.instagram_url;
            user.soundcloud_url = req.params.userdata.soundcloud_url;
            user.website_url = req.params.userdata.website_url;
            user.facebook_url = req.params.userdata.facebook_url;
            user.xing_url = req.params.userdata.xing_url;
            user.twitter_url = req.params.userdata.twitter_url;
            return user.save(function(err) {
                if (!err) {
                    console.log("updated");
                } else {
                    console.log(err);
                }
                return res.send(user);
            });
        });

    };

    /**
     * This function updates the user
     * 
     * @param {any} req
     * @param {any} res
     * @param {any} next
     * @returns updated user
     */

    this.deleteUser = function(req, res, next) {
        return User.findById(req.params.id, function(err, user) {
            return user.remove(function(err) {
                if (!err) {
                    console.log("user removed");
                    return res.send('');
                } else {
                    console.log(err);
                }
            });
        });
    };

    return this;

}



module.exports = new userController();