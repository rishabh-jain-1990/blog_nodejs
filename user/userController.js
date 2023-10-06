import { User } from '../model/User.js';

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

// export const updateUser = 