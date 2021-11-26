const mongoose = require('mongoose')

const dolbyMapSchema = new mongoose.Schema({
    map : {
        type : String,
        required: true
    },
    data: {
        type: Object,
        default:{
                images : [],
                iframes : [],
                label: [],
                borders: [],
                likeBtn: [],
                likeCount: [],
                urls:[]
        }
    },
});

module.exports = mongoose.model('dolbyMapSchema', dolbyMapSchema);