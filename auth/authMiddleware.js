import * as constants from '../utils/resources.js';
import jwt from 'jsonwebtoken';


export const requireAuth = (req, res, next) => {

    try {

        const token = req.headers[constants.KEY_HEADER_AUTH];
        if (token) {
            jwt.verify(token, process.env.JWTSecretKey, (err, decodedToken) => {
                if (err) {
                    console.log(err);
                    res.status(400).send(constants.ERR_TOKEN_INVALID)
                }
                else {
                    console.log(decodedToken);
                    next();
                }
            });
        }
        else
            res.status(400).send(constants.ERR_TOKEN_MISSING);
    } catch (err) {
        console.log(err);
        res.status(400).send(constants.ERR_TOKEN_INVALID)
    }
}