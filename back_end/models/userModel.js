const mongoose = require('mongoose');

const Model = new mongoose.Schema({
/* matricule: {
required: false,
type: String
},*/
rfid: {
    required: false,
    type: String
    },
    
nom: {
required: true,
type: String
},

prenom: {
required: true,
type: String
}, 

email: {
    required: true,
    type: String
},

password:{
    required: true,
    type: String
}


})


module.exports = mongoose.model('users', Model);/* users nom de la collection */