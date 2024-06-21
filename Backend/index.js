const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname.replace(/\s+/g, '');
        const filename = new Date().toISOString().replace(/:/g, '-') + '-' + originalName;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: fileStorage , fileFilter: fileFilter });
app.use(upload.single('image'));

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const MONGODB_URI = process.env.MONGODB_URI;

app.use('/users', authRoutes);
app.use('/posts', postRoutes);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(3000);
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });