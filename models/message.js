module.exports = (function messageSchema() {
    // import the necessary modules
    var mongoose = require('../db').mongoose;
    var Schema = mongoose.Schema;
    var user = require('./user');

    // model creation
    var MessageSchema = new Schema({
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        title: String,
        text: String,
        read: Boolean,
    }, {
        timestamps: {
            createdAt: 'created_at',
        },
    });

    var MessageModel = mongoose.model('Message', MessageSchema);

    return MessageModel;
})();