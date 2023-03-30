const mongoose = require('mongoose');

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(url)
        .then(() => console.log('MongoDB connection established'))
        .catch((err) => console.log(err));
};

module.exports = connectDB;
