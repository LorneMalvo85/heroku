module.exports = function(app) {
    var userCtrl = require('./controllers/userCtrl');
    var categoryCtrl = require('./controllers/categoryCtrl');

    app.get('/', function(req, res, next) {
        return res.send("WELCOME TO THE REST API");
    });

    // User Routes
    app.post('/api/users', userCtrl.createUser); //Create user API
    app.get('/api/users/user/getUser', userCtrl.findUserByToken);
    app.get('/api/users', userCtrl.getUsers); // Get all user details API
    app.post('/api/users/updateUser', userCtrl.updateUser); // Get details of particular user API
    app.get('/api/users/around', userCtrl.getUsersAround); // Get all users from point [long, lat] in given radius (m)
    app.del('/api/users/user/:id', userCtrl.deleteUser); // Delete particular user
    app.post('/api/users/user/updateLocation', userCtrl.updateUserPosition)

    // Category Routes
    app.get('/api/categories', categoryCtrl.getCategories)
    app.post('/api/categories/newcategory', categoryCtrl.createCategory)
};