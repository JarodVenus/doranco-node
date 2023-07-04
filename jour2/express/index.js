const express = require("express");
const server = express();

const { tabs } = require("./bdd");

server.use(express.json());

server.post("/exo1", function (request, response) {
  const tab = request.body;
  response.json(tab);
});

server.delete("/exo/:id", (request,response) => {
    const id = request.params.id
    const search = tabs.find(function(tab){
        return tab.id == id
    })
    const index = tabs.indexOf(tabToDelete);
    tabs.splice(index, 1)
    response.json({message : "tab supprimé", error : "null"})
})

server.put("/exo/:id" , ( request , response ) => {
    const id = request.params.id
    const modifTab = request.body
    const tabToUpdate = tabs.find(function(tab){
        return id == tab.id
    })
    const index = tabs.indexOf(tabToUpdate)
    tabs[index].nom = tabToUpdate.nom
    tabs[index].sujet = tabToUpdate.sujet

    response.json({message : "tab modifiée", error : "null"})

})

server.get("/", function (request, response) {
  response.send("Bonjour les amis !");
});

server.get("/prduits", (request, response) => {
  const p = [
    { id: 1, nom: "ps4" },
    { id: 2, nom: "ps5" },
  ];

  response.json(p);
});

server.get("/etudiants/:num", (request, response) => {
  const etudiants = [
    { id: 1, nom: "Alain" },
    { id: 2, nom: "Paul" },
  ];

  const id = request.params.num;
  const etudiantR = etudiants.find(function (etudiant) {
    return id == etudiant.id;
  });

  if (!etudiantR) {
    return response.json({
      erreur: 404,
      message: `Etudiant inconnu pour l'id : ${id}.`,
    });
  }

  console.log(etudiantR);
  response.json(etudiantR);
});

// server.get("/exo/:name", ( request , response ) => {
//     const tabs = [
//         { id : 1 , nom : "php" , sujet : "lorem ipsum" },
//         { id : 2 , nom : "js" , sujet : "lorem ipsum et le DOM" },
//         { id : 3 , nom : "node" , sujet : "lorem ipsum et npm" }
//     ]

//     const url = request.params.name

//     const tabSearch = tabs.find( function(tab){
//         return tab.nom == url
//     })

//     if(url == "all"){
//         return response.json(tabs)
//     }
//     if(!tabSearch){
//         return response.json({erreur : 404 , message : `Langage encore incconnu`})
//     }
//     response.json(tabSearch)
// })

server.listen("4002", () => console.log("Le serveur est démarré."));
