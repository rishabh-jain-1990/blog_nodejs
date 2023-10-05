import { User } from '../model/User.js'
import * as constants from '../utils/resources.js';
import jwt from 'jsonwebtoken';

const handleError = (err) => {
    let errors = {};

    // duplicate email error
    if (err.code === 11000) {
        errors.email = constants.ERR_EMAIL_DUPLICATE;
        return errors;
    }

    //validation errors
    if (err.message.includes(constants.ERR_VALIDATION_MESSAGE)) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

const createToken = (id) => {
    return jwt.sign({id}, constants.JWTSecretKey, {
        expiresIn: constants.maxTokenAgeInSec
    })
}

export const signup_post = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.json({ user: user._id , token: token});
    } catch (err) {
        const errors = handleError(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
}

export const login_post = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.login(email, password );
        const token = createToken(user._id);
        res.json({ user: user._id , token: token});
    } catch (err) {
        console.log(err);
        const errors = handleError(err);

        if (errors) {
            console.log(errors);
            res.status(400).json({ errors });
        }
        else {
            console.log(err);
            res.status(400).json({ err });
        }
    }
}