const sqlite3 = require("sqlite3")
const UtilisateurDAO = require("./model/utilisateurDao")
const Utilisateur = require("./model/utilisateur")
const LikeDAO = require("./model/likeDao")
const Like = require("./model/like")
const CommentaireDAO = require("./model/commentaireDao")
const Commentaire = require("./model/commentaire")
const DefiDAO = require("./model/defiDao")
const Defi = require("./model/defi")
const DefiSauvegardeDAO = require("./model/defiSauvegardeDao")
const DefiSauvegarde = require("./model/defiSauvegarde")
const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const passport = require('passport')

const db = new sqlite3.Database("./mabase.db")
const utilisateurdao = new UtilisateurDAO(db)
const likedao = new LikeDAO(db)
const commentairedao = new CommentaireDAO(db)
const defidao = new DefiDAO(db)
const defisauvegardedao = new DefiSauvegardeDAO(db)

require('./model/seeder')(utilisateurdao, likedao, commentairedao, defidao, defisauvegardedao, () =>{
    
})

const app = express()
app.use(cookieParser()) // read cookies (obligatoire pour l'authentification)
app.use(cookieSession({keys: ['exemplecourssecretkey']}));
app.use(bodyParser.urlencoded({ extended: false })) // pour les 'form' HTML
app.use(bodyParser.json())
app.use(morgan('dev')); // toute les requêtes HTTP dans le log du serveur

app.use(passport.initialize())
app.use(passport.session())

const auth = require('./passport')(passport, utilisateurdao)
require('./api/utilisateur')(app, utilisateurdao, auth)
require('./api/like')(app, likedao, auth)
require('./api/commentaire')(app, commentairedao, auth)
require('./api/defi')(app, defidao, auth)
require('./api/defiSauvegarde')(app, defisauvegardedao, auth)
require('./routes')(app, passport, auth)

app.listen(3333)