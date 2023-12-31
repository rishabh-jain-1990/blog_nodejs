import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

import express from 'express';
import * as constants from './utils/resources.js';
import mongoose from 'mongoose';
import { router as authRouter } from './auth/authRoutes.js';
import { router as userRouter } from './user/userRoutes.js';
import { requireAuth } from './auth/authMiddleware.js';


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

mongoose.connect(process.env.DB_URL)
    .then(() => {
        app.listen(process.env.PORT, (req, res) => console.log(constants.SERVER_RUN_LOG, process.env.PORT));
        console.log(constants.DB_CONNECTION_REQUEST_SUCCESS)
    })
    .catch(err => console.log(err));


app.get('/', (req, res) => res.send(constants.DEFAULT_API_RESPONSE));
app.use(authRouter);
app.use(userRouter, requireAuth);
