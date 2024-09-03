const express = require ('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');

// Création de l'application
const app = express();

// cors
app.use(cors())

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/user');

const password = require('./utils/password');

// Connection à la base de données MongoDB

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sarah:BonjourMongo!@cluster0.imu9d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// Middleware permettant à Express d'extraire le corps JSON des requêtes POST
app.use(express.json());

// Middleware gérant les erreurs de CORS
app.use((req, res, next) => {
  // Accès à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Autorisation d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    // Autorisation d'envoyer des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Gestion de la ressource images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));

// Enregistrement des routeurs
  app.use('/api/books', booksRoutes);
  app.use('/api/auth', usersRoutes);


module.exports = app;