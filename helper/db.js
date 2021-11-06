const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movie_user:BYe7kVDSDr1Dq4Nc@cluster0.qz3r5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
    mongoose.connection.on('open', () => {
        console.log('MongoDB connected successful.');
    });
    mongoose.connection.on('error', () => {
        console.log('MongoDB connected failed!');
    });
    mongoose.Promise = global.Promise;
};