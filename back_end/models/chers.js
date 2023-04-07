const mongoose = require('mongoose');

const Rfid = new mongoose.Schema({
/* matricule: {
required: false,
type: String
},*/
rfid: {
    required: true,
    type: String
    },
    









})


module.exports = mongoose.model('users', Rfid);/* users nom de la collection */