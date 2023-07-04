const express = require("express")
const route = require("./Route")
const routeUser = require('./route-user')
const routeConnexion = require("./route-connexion")
const {connect} = require("mongoose")
require("dotenv").config()

const URI = process.env.NODE_ENV === "production" ? process.env.BDD_PROD : process.env.BDD_DEV

console.log("ici", process.env.NODE_ENV)
connect(URI)
    .then(() => console.log("connexion à MongoDB réussie"))
    .catch((ex) => console.log(ex))

const port = 4003;

const app = express()

app.use(express.json());

app.use(route)
app.use(routeUser)
app.use(routeConnexion)

app.listen(port , () => console.log(`expresss start sur port ${port}.`))