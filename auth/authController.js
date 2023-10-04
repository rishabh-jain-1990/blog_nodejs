import { User } from '../model/User.js'

export const signup_post = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.create({ email, password });
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(400).send('User not created');
    }
}

export const login_post = async (req, res) => {

    try{
    const { email, password } = req.body;
    const user = await User.find({email, password});
    res.json(user);
    }catch(err){
        console.log(err);
        res.status(400).send('User login failed');
    }
}