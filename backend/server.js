// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from './utils/db.js';
import authRouter from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import authenticateToken from './middlewares/authMiddleware.js';
import salesRouter from './routes/salesRoute.js';


// Load environment variables
dotenv.config()
const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);
app.use(authenticateToken);// Authenticate token for all secure routes
app.use("/api/secure/sales", salesRouter);


await connectDB();// Connect to PostgreSQL database

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
})
