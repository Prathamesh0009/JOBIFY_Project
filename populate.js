import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './models/JobModel.js';
import User from './models/UserModel.js';

const DB = 'mongodb+srv://prathamesh:pratham09@cluster0.red491r.mongodb.net/JOBIFY?retryWrites=true&w=majority';

try {
  await mongoose.connect(DB);
  const user = await User.findOne({ email: 'prathamesh.patil000009@gmail.com' });

  const jsonJobs = JSON.parse(
    await readFile(new URL('./utils/mockData.json', import.meta.url))
  );
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id };
  });
  await Job.deleteMany({ createdBy: user._id });
  await Job.create(jobs);
  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}