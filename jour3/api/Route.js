const {Router} = require("express")
const { Article } = require("./model")
const Joi = require("joi")

const schemaArticleJoi = Joi.object({
    titre : Joi.string().min(2).max(255).required(),
    contenu : Joi.string().min(5).max(10000).required(),
    like : Joi.number().min(0).required(),
    auteur : Joi.string().min(1).max(255).required()
})

const route = Router()

route.get("/" , function(request,response){
    response.json({msg : "fonction"})
})

route.post('/' , async function(request,response){
    const {body} = request;

    const {error} = schemaArticleJoi.validate(body , { abortEarly : false})

    if(error) return response.status(400).json(error.details)

    const newArticle = new Article(body)
    await newArticle.save()
    response.json(newArticle)
})

async function supprimer(){
    await Article.findByIdAndRemove()
}

route.delete("/:id", async ( request , response ) => {
    const id = request.params.id
    await Article.findByIdAndRemove( id )
})

route.get("/all", async (request , response) => {
    const resultat = await Article.find()
    response.json(resultat)
})

route.get("/:id", async (response,request) => {
    const id = request.params.id
    const resultat = await Article.find((article) => id == article.id)
    response.json(resultat)
})

route.put("/:id" , (request,response) => {

})

module.exports = route