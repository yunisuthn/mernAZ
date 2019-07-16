const mongoose = require('mongoose')

const Article = mongoose.Schema({
    _id: Number,
    article: String
},{
    timestamps: true
});

module.exports = mongoose.model('article', Article);