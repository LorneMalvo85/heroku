module.exports = (function reviewSchema() {
    // import the necessary modules
    var mongoose = require('../db').mongoose;
    var user = require('./user');
    //var User = mongoose.model('User');

    var Schema = mongoose.Schema;

    var CommentSchema = new Schema({
        created_by: {
            type: Schema.Types.ObjectId,
            created_by: 'User'
        },
        recipient: {
            type: Schema.Types.ObjectId,
            created_by: 'User'
        },
        title: String,
        text: String,
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

    // register the mongoose Model
    var CommentModel = mongoose.model('Comment', CommentSchema);



    return CommentModel;
})();