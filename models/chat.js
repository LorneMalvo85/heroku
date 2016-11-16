module.exports = (function chatSchema() {
    // import the necessary modules
    var mongoose = require('../db').mongoose;
    var Schema = mongoose.Schema;
    var user = require('./user');

    // model creation
    var ChatSchema = new Schema({
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        messages: [{
            message: String,
            meta: {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                read: Boolean
            }
        }],
        recipient: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            read: Boolean,
        }
    });

    var ChatModel = mongoose.model('Chat', ChatSchema);

    return ChatModel;
})();