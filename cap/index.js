import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
// import _db from './_dbConnect.js';
import userRoute from './route/userRoutes.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
// const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['https://task-master-two-henna.vercel.app'],
  credentials: true,
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  allowedHeaders: ['content-Type', 'AUthorization', 'token'],
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/user', userRoute);

// Database Connection and Server Start
const PORT = process.env.PORT || 4000;
const MONGOURL = process.env.MONGO_URL;


mongoose.connect(MONGOURL).then(()=>{
    console.log("database is connected")
    app.listen(PORT, ()=>{
        console.log(`server is connected successfully ${PORT}`)
    })
}).catch((err)=>console.log(err));


// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});
