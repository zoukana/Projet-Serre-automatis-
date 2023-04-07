const express = require('express');
const Rfid = require('../models/userModel');
const temphum = require('../models/serre');
/* const Serre = require('../models/serreModel'); */
// const Modeltemp = require('../models/userModel copy');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const check = require('./midleware');
var MongoClient = require('mongodb').MongoClient;
const router = express.Router();
var url = "mongodb+srv://oumy:1234@cluster0.ayfcz7h.mongodb.net/arrosage";
const Model = require('../models/userModel');

module.exports = router;

/* pour la connection  RFID*/
/*
router.post("/login",  async (req, res, next) => {
  let {rfid } = req.body;
  let existingrfid;
  //console.log(rfid);
  existingrfid = await Model.findOne({ rfid: rfid});
  //console.log(existingrfid);
  if(!existingrfid){
    return res.status(401).send("user est archivé...!");
  } 
  let token;
  try {
    //Creating jwt token
    token = jwt.sign(
      { userId: existingrfid.id,rfid: existingrfid.rfid },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Erreur! Quelque chose s'est mal passée.");
    return next(error);
  }
  
  res
    .status(200)
    .json({
      success: true,
      data: {
        email: existingrfid.email,
        prenom: existingrfid.prenom,
        nom: existingrfid.nom,
        rfid: existingrfid.rfid,
        token: token,
      },
  });
});
=======
>>>>>>> 7012657b4a799d2796f5903be35733bca5c7d892

*/

/* pour la connection */
router.post("/login",  async (req, res, next) => {

    let { email, password } = req.body;
    
    let existingUser;

    existingUser = await Model.findOne({ email: email});

    if (!existingUser) {
      return res.status(400).send("email doesn't exist...!");
    }
  
    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).send("password is invalid");
    }
    
    
    let token;
    try {
      //Creating jwt token
      token = jwt.sign(
        { userId: existingUser.id, email: existingUser.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
    } catch (err) {
      console.log(err);
      const error = new Error("Erreur! Quelque chose s'est mal passée.");
      return next(error);
    }
    
    res
      .status(200)
      .json({
        success: true,
        data: {
          userId: existingUser.id,
          email: existingUser.email,
          prenom: existingUser.prenom,
          nom: existingUser.nom,
          token: token,
        },
    });
});

/*  la méthode POST passe les paramètres dans le corps de la requête. */
router.post('/post', async(req, res) => {

const { email, password, prenom, nom,rfid} = req.body;
const users = [];

const newUser = Model({
    email,
    password, 
     prenom, 
    nom,
    rfid
 

});

try {

  const oldUser = await Model.findOne({ email });

  if (oldUser) {
    return res.status(409).send("Email Already Exist. Please Login");
  }

    const hash = await bcrypt.hash(newUser.password,10);
    newUser.password = hash;

    users.push(newUser);
    /* res.json(newUser); */
    await newUser.save();

    res.status(201).json(newUser);

} catch(error) {
    res.status(400).json({message: error.message})
}

})
/* La méthode GET est utilisée par le navigateur pour 
demander au serveur de renvoyer une certaine ressource. */
router.get('/getAll',check, async(req, res) => {
try{
const data = await Model.find();
res.json(data)
}
catch(error){
res.status(500).json({message: error.message})
}
})
/* get by id methode */
router.get('/getOne/:id', async(req, res) => {
const data = await Model.findById(req.params.id);
res.json(data)
})

/* update by id methode  pour la mdodification*/
router.patch('/update/:id', async (req, res) => {
try {
const id = req.params.id;
const updatedData = req.body;
const options = { new: true };

if (updatedData.password){
    const hash = await bcrypt.hash(updatedData.password, 10);
    updatedData.password = hash;
    
            const result = await Model.findByIdAndUpdate(
            id, updatedData, options
            );
    
          return  res.send(result);
    
        }


    const result = await Model.findByIdAndUpdate(
        id, updatedData, options
    )

   return res.send(result)
}
catch (error) {
    res.status(400).json({ message: error.message })
}
})
/* delete by id method pour supprimer */

router.delete('/delete/:id', async(req, res) => {
try {
const id = req.params.id;
const data = await Model.findByIdAndDelete(id)
res.send(`Le Document avec le nom ${data.prenom} ${data.nom} a été supprimé..`)
}
catch (error) {
res.status(400).json({ message: error.message })
}
})

/* get all method */
router.get('/pap', async(req, res) => {
  try{
  /* const data = await Modeltemp.find();
rs  console.log(data);
  res.json(data) */

  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("arrosage");
    var col = dbo.collection('serre');
    col.find().toArray(function(err, items) {
        console.log(items);
             res.json(items)
console.log(items);

})

})
  }
  catch(error){
  res.status(500).json({message: error.message})
  }
  })

 // router.get('/pap', async(req, res) => {
  // try{
  /* const data = await Modeltemp.find();
  console.log(data);
  res.json(data) */

  /* MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("arrosage");
    var col = dbo.collection('serre');
    col.find().toArray(function(err, items) {
        console.log(items);
             res.json(items)
console.log(items); */

/* try{
  const data = await temphum.find();
  console.log(data);
  res.json(data)
  }
  catch(error){
  res.status(500).json({message: error.message}) 
  }*/

 // })


  // 
  router.get('/deletetemp', async(req, res) => {
    try {
      MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("arrosage");
        var col = dbo.collection('serre');
        col.deleteMany()
            
    })
    
    
    }
    catch (error) {
    res.status(400).json({ message: error.message })
    }

    router.post('/add-temphum', async(req, res) => {

      const { temperature, humidite_sol, humidite_serre} = req.body;
      const serre = [];
      
      const newSerre = serre({
        temperature,
        humidite_sol, 
        humidite_serre, 
      
      });
      try {

        /* const oldUser = await Model.findOne({ email });
      
        if (oldUser) {
          return res.status(409).send("Email Already Exist. Please Login");
        } */
      
        /*   const hash = await bcrypt.hash(newUser.password,10);
          newUser.password = hash; */
      
          serre.push(newSerre);
          /* res.json(newUser); */
          await newSerre.save();
      
          res.status(201).json(newSerre);
      
      } catch(error) {
          res.status(400).json({message: error.message})
      }
      
    })
  // list data
/* router.get('/pap', function(req, res) {
  Modeltemp.find(function (err, sales) {
      if (err) return next(err);
      res.json(sales);
  });
}); */

})