const routes      = require("../app/routes");
const Controller  = require('./Controller');
const Express     = require('express');
const DbAccess = require('./DbAccess');

/**
 * Cria as rotas declaradas em app/route.js
 * @param {Express app} app - Aplicação express
 * @param {Mongoose model} model - Modelos gerados pelo Mongoose
 */
function BuildRoutes (app, models) {
  
  
  // Itera por todas as rotas R declaradas
  // no arquivo app/routes.js
  Object.keys(routes).forEach(R => {
    
    // Nova definição de subrota
    const subroutes = Express.Router({ mergeParams: true });
    
    // Controller customizado para a rota R
    let cont = routes[R].controller;

    // Objeto da API REST base a ser criada
    let api = routes[R].apiObject;

    let db = new DbAccess(models[api])

    // Se foi declarado um objeto
    // para a API, cria a API
    if (api) {
      // Chama controller da API REST base
      // passando o router e o objeto de acesso ao banco
      Controller(subroutes, db);
    }

    
    // Se foi declarado um controller customizado
    // adiciona-o suas subrotas à rota R
    if (cont) {
      // Chama controller definido para a rota R
      cont(subroutes, models, db);
    }


    // Salva as subrotas da rota R
    app.use(R, subroutes);
    
  });

};

module.exports = BuildRoutes;
