import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import http from 'http';
// db
import dbConnect from './config/db.js';
// data
import { seedDatabase } from './controllers/seedDishData.js';
// routes
import dishRoute from './routes/dish.routes.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Pass the io instance to routes
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/v1/dish', dishRoute);

const PORT = 8000;
server.listen(PORT, () => console.log(`Server is running successfully on ${PORT}`));

dbConnect();

io.on('connection', (socket) => {
    console.log('A user connected');
    // Handle events here
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});
