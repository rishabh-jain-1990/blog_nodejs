import mongoose from 'mongoose';
import pkg from 'validator';
import * as constants from '../utils/resources.js';

const {isEmail} = pkg;

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, constants.ERR_EMAIL_REQUIRED],
        unique: [true, constants.ERR_EMAIL_DUPLICATE],
        lowercase: true,
        validate: [isEmail, constants.ERR_EMAIL_INVALID],
    },
    password: {
        type: String,
        required: [true, constants.ERR_PASSWORD_REQUIRED],
        minlength: [8, constants.ERR_PASSWORD_LENGTH],
    }
})

export const User = mongoose.model('user', userSchema);