const app         = require('./base/Express');
const models      = require('./base/Mongoose');
const buildRoutes = require('./base/BuildRoutes');
const Firebase    = require('./firebase');
const port    = 8000;


// Declara as rotas da API
buildRoutes(app, models);



// Inicializa a escuta do servidor
app.listen(port, () => {

  console.log('Escutando na porta ' + port);

});