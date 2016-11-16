/**
 * Controller for the category functionality
 * 
 * @returns this
 */

function categoryController() {

    var Category = require('../models/category'); // get the category model


    this.getCategories = function(req, res, next) {
            Category.find({}, function(err, result) {
                if (err) {
                    console.log(err);
                    return res.send({
                        'error': err
                    });
                } else {
                    return res.send({
                        'categories': result
                    });
                }
            });
        },

        /**
         * This Function creates a new user 
         * 
         * @param {any} req
         * @param {any} res
         * @param {any} next
         */
        this.createCategory = function(req, res, next) {
            console.log("creating category");

            Category.create({
                name: req.params.name
            }, function(err, result) {
                if (err) {
                    console.log(err);
                    return res.send({
                        'error': err
                    });
                } else {
                    return res.send({
                        'result': result,
                        'status': 'category successfully saved'
                    });
                }
            });
        };

    return this;

}

module.exports = new categoryController();