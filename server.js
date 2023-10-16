import 'express-async-errors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js'
import {authenticateUser} from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import cloudinary from 'cloudinary';


const DB = 'mongodb+srv://prathamesh:pratham09@cluster0.red491r.mongodb.net/JOBIFY?retryWrites=true&w=majority';
mongoose.connect(DB).then(() =>{
  console.log('connection successfull')
}).catch((err)=>console.log('no connection'));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, './public')));

if(process.env.NODE_ENV ='development'){
app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Prathamesh');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/jobs',authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});


  app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
  });

  //error middleware

  app.use(errorHandlerMiddleware);

const port =  5100;

app.listen(port, () => {
  console.log(`server running on PORT  ${port}....`);
});