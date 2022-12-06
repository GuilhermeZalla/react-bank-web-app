import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import Register from "./routes/registration";
import Account from "./routes/accountPulling"
require('../config/database');

export const app = express();

app.use(express.json());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/register', Register);
app.use('/accountpulling', Account);