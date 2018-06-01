/**
 * Classe base de controller
 * Métodos REST implementados:
 *  - GET    api/id
 *  - GET    api/id
 *  - POST   api
 *  - PUT    api/id
 *  - DELETE api/id
 * @param {Express router} router - Aplicação express
 * @param {String} api - Base da API
 * @param {Mongoose model} model - Modelo gerado pelo Mongoose
 */
module.exports = (router, model, next) => {

    this._model = model;

    // Métodos REST

    router.get('/:id',
        (req, res) => this._model.findById(req, res));

    router.get('/',
        (req, res) => this._model.find(req, res));

    router.post('/',
        (req, res, next) => this._model.insert(req, res, next));

    router.put('/:id',
        (req, res, next) => this._model.update(req, res, next));

    router.delete('/:id',
        (req, res, next) => this._model.remove(req, res, next));

};
