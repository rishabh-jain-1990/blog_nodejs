import { User } from '../model/User.js'
import * as constants from '../utils/resources.js';

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

export const signup_post = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.create({ email, password });
        res.json({ user });
    } catch (err) {
        const errors = handleError(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
}

export const login_post = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await User.find({ email, password });
        res.json(user);
    } catch (err) {
        const errors = handleError(err);
        console.log(errors);
        res.status(400).json({ errors });
    }
}