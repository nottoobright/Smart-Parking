const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter your name',
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, 'Invalid Email Address'],
        required: 'Please enter your email address'
    },
    license: {
        type: String,
        required: "Please enter your license plate number",
        trim: true
    },
    aadhar: {
        type: Number,
        trim: true
    },
    mobile: {
        type: Number,
        trim: true
    }

});

userSchema.virtual('gravitar').get(function() {
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', userSchema);