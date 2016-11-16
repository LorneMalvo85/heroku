module.exports = (function categorySchema() {
    // import the necessary modules
    var mongoose = require('../db').mongoose;
    //   var User = mongoose.model('User');

    var Schema = mongoose.Schema;


    var CategorySchema = new Schema({
        name: String
    }, {
        timestamps: {
            createdAt: 'created_at',
        }
    });

    // register the mongoose Model
    // model creation
    var CategoryModel = mongoose.model('Category', CategorySchema);


    return CategoryModel;
})();