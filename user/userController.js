import { User } from '../model/User.js';
import * as constants from '../utils/resources.js';

const handleError = (err) => {
    let errors = {};

    //validation errors
    if (err.message.includes(constants.ERR_UPDATE_VALIDATION_MESSAGE)) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

export const getUserDetails = async function (req, res) {
    try {
        const id = req.params.id;
        if (id) {
            const user = await User.findById(id);
            if (user) {
                res.json(user);
            } else
                res.status(400).send('User not found');
        } else
            res.status(400).send('User id is missing');
    } catch (err) {
        console.log(err);
        res.status(400).send('Request Failed');
    }
}

export const updateUser = async function (req, res) {
    try {
        const id = req.params.id;
        if (id) {
            const user = await User.findOneAndUpdate(
                {
                    _id: id,
                },
                {
                    $set: {
                        email: req.body.email,
                        name: req.body.name,
                        gender: req.body.gender,
                        age: req.body.age
                    }
                },
                { 
                    new: true,
                    runValidators: true
                }
            );

            
            console.log(user);
            res.json(user);
        } else
            res.status(400).send('User id is missing');
    } catch (err) {
        const errors = handleError(err);
        console.log(err);
        res.status(400).json({ errors });
    }
}