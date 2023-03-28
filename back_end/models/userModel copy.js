const mongoose = require('mongoose');

const serreSchema = new mongoose.Schema({
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
type: String
}

})


module.exports = mongoose.model('serre', serreSchema);/* users nom de la collection */