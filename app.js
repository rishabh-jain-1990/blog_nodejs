import express from 'express';
import * as constants from './utils/resources.js';
import mongoose from 'mongoose';
import {router} from './auth/authRoutes.js';


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

mongoose.connect(constants.DB_URL)
.then(() => {
    app.listen(constants.PORT, (req, res) => console.log(constants.SERVER_RUN_LOG, constants.PORT));
    console.log(constants.DB_CONNECTION_REQUEST_SUCCESS)
})
.catch(err => console.log(err));


app.get('/', (req, res) => res.send(constants.DEFAULT_API_RESPONSE));
app.use(router);
