//transaction details--schema

const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    ReferenceNum: Number,

    Sender: {
        type: String,
        required: true
    },

    TransactionAmount:
    {
        type: Number,
        required: true
    },
       
    AmountInWords: {
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model('Post', PostSchema);