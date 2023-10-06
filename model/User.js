import mongoose from 'mongoose';
import pkg from 'validator';
import * as constants from '../utils/resources.js';
import  {withoutProperty} from '../utils/functions.js';
import bcrypt from 'bcrypt';

const { isEmail } = pkg;

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
        select: false,
    }
});

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email }).select('+password');

    if (user) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            return withoutProperty(user.toObject(), 'password');
        }
        throw Error(constants.ERR_PASSWORD_INCORRECT);
    }
    throw Error(constants.ERR_EMAIL_NOT_FOUND);
};

export const User = mongoose.model('user', userSchema);