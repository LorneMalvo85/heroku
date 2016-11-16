module.exports = (function likeSchema() {
    // import the necessary modules
    var mongoose = require('../db').mongoose;
    var user = require('./user');
    //   var User = mongoose.model('User');

    var Schema = mongoose.Schema;

    var LikeSchema = new Schema({
        liked_by: {
            type: Schema.Types.ObjectId,
            created_by: 'User'
        },
        user_liked: {
            type: Schema.Types.ObjectId,
            created_by: 'User'
        }
    }, {
        timestamp: {
            createdAt: 'created_at',
        }
    });

    // register the mongoose Model
    // model creation
    var LikeModel = mongoose.model('Like', LikeSchema);


    return LikeModel;
})();