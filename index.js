import express from 'express';
import * as constants from './utils/resources.js';

const app = express();

app.listen(constants.PORT, (req, res) => console.log(constants.SERVER_RUN_LOG, constants.PORT));

app.get('/', (req, res) => res.send(constants.DEFAULT_API_RESPONSE));