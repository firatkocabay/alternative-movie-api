const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: 32,
        minlength: 3
    },
    category: String,
    country: String,
    year: {
        type: Number,
        maxlength: 2050,
        minlength: 1900
    },
    imdbScore: {
        type: Number,
        maxlength: 10,
        minlength: 0
    },
    director_id: Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);