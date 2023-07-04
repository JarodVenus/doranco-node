const { Router } = require('express')
const { schemaJoiUser } = require('./verif')
const { User } = require('./model')
const { compare } = require('bcrypt')
const JWT = require("jsonwebtoken")

const route = Router()

route.post("/login" , async (request,response) => {

    const body = request

    const {error} = schemaJoiUser.validate(body , {abortEarly : false})
    if(error) return response.status(400).json(error.details)

    const userFinder = await User.findOne({email : body.email})

    if(!userFinder) return response.status(404).json({msg : `Profil introuvable avec l'id mentionné : ${id}`})

    const verif = await compare(body.password, userFinder.password)

    if(!verif) return response.status('400').json({msg : "Aucun profil ne correspond à ces identifiants."})

    const profilNoPwd = {
        _id : userFinder._id,
        email : userFinder.email
    }

    const token = JWT.sign(profilNoPwd , "clé secrète")

    response.json({msg : "Bienvenu", token : token })

} )

module.exports = route