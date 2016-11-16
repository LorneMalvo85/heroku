module.exports = function(app) {
    var user = require('./controllers/userCtrl');
    var category = require('./controllers/categoryCtrl');

    app.get('/', function(req, res, next) {
        return res.send("WELCOME TO THE REST API");
    });

    // User Routes
    app.post('/api/users', user.createUser); //Create user API
    app.get('/api/users/user/getUser', user.findUserByToken);
    app.get('/api/users', user.getUsers); // Get all user details API
    app.post('/api/users/updateUser', user.updateUser); // Get details of particular user API
    app.get('/api/users/around', user.getUsersAround); // Get all users from point [long, lat] in given radius (m)
    app.del('/api/users/user/:id', user.deleteUser); // Delete particular user
    app.post('/api/users/user/updateLocation', user.updateUserPosition)

    // Category Routes
    app.get('/api/categories', category.getCategories)
    app.post('/api/categories/newcategory', category.createCategory)
};