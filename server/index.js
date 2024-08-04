import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

const app = express();
app.use(express.json());
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB)
    .then(() => {
        console.log('\n--> Connected to MongoDB!');
    })
    .catch((err) => {
        console.error(err);
    });

// Start server
app.listen(3000, () => {
    console.log('\n--> Server is running on port 3000!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Middleware for handling errors
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({ success: false, statusCode, message });
});
