// TODO Comment
module.exports = (function userSchema() {
    // import the necessary modules
    var mongoose = require('../db').mongoose;
    console.log("mongoose: ", mongoose)

    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        username: String,
        password: String,
        email: String,
        category: String,
        isArtist: Boolean,
        about: String,
        coordinates: {
            type: [Number], // [ <longitude> , <latitude> ]
            index: '2dsphere' // create geospatial index
        },
        city: String,
        profilepic_url: String,
        youtube_url: String,
        soundcloud_url: String,
        instagram_url: String,
        website_url: String,
        facebook_url: String,
        twitter_url: String,
        xing_url: String
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

    var UserModel = mongoose.model('User', UserSchema);

    return UserModel;
})();

/*
    var UserSchema = new Schema({
        username: String,
        password: String,
        email: String,
        category: String,
        isArtist: Boolean,
        about: String,
        coordinates: {
            type: [Number], // [ <longitude> , <latitude> ]
            index: '2dsphere' // create geospatial index
        },
        city: String,
        profilepic_url: String,
        media: {
            youtube_url: String,
            soundcloud_url: String,
            instagram_url: String,
            website_url: String
        },
        social: {
            facebook_url: String,
            twitter_url: String,
            xing_url: String
        },
        likes: [{
            type: Schema.Types.ObjectId,
            created_by: 'Like'
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            created_by: 'Comment'
        }]
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });
    */