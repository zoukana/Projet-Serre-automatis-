const mongoose = require('mongoose');

const serreSchema = new mongoose.Schema({
/* matricule: {
required: false,
type: String
},*/
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


module.exports = mongoose.model('users', serreSchema);/* users nom de la collection */