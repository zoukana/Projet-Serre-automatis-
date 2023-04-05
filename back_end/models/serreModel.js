const mongoose = require('mongoose');

const Serre = new mongoose.Schema({
temperature: {
type: String
},
humidite_sol: {
type: String
},
humidite_serre: {
    type: String
    },
Date: {
type: Date
},
Heure: {
    type: Date
    }

})


module.exports = mongoose.model('serre', Serre);/* users nom de la collection */