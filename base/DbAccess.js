const uuid = require("uuid/v1");

/**
 * Classe de acesso ao banco pelo Mongoose
 * @param {Mongoose model} model - Model gerado pelo Mongoose
 */
module.exports = class DbAccess {

    constructor (model) {
   
        // Cópia interna do model
        this._model = model;
    }


    /**
     * Se encontrou objeto, retorna-o com status 200.
     * Senão, retorna objeto vazio com status 404
     */
    _requestWithIdResponse (req, res, obj, next) {
        if (obj) {
            res.status(200).json(obj);
            
            if (next) {
                req.body.returnObj = obj;
                next();
            }
        } else {
            res.status(404).json({});
        }
    }



    /**
     * Procura objeto no banco pela query GET
     */
    find(req, res) {

        // Procura objetos pela query e o retorna
        this._model.find(req.query)
            .catch(err => res.status(500))
            .then(array => res.status(200).json(array));

    }



    /**
     * Procura objeto no banco pelo ID
     */
    findById(req, res) {

        // Procura único objeto pelo ID e o retorna
        this._model.findById(req.params.id)
            .catch(err => res.status(500))
            .then(obj => this._requestWithIdResponse(req, res, obj));

    }



    /**
     * Insere vários objetos no banco
     */
    insert(req, res, next) {

        // Objetos a serem adicionados
        let array = Array.isArray(req.body)
            ? req.body
            : [req.body];
        // Array de resposta resposta
        let addedObjs = [];
        // Quantidade de objetos a serem adicionados
        let cont = array.length;

        // Itera por todos os elementos
        array.forEach(element => {

            if (req.body._id) {

                // Se o objeto já possuir ID, manda para update
                req.params.id = req.body._id;
                this.update(req, res);

            } else {

                // Atribui UUID ao ID do objeto
                req.body._id = uuid();

                // Salva o elemento no banco
                this._model.create(element)
                    .catch(err =>
                        res.status(500))
                    .then(obj => {

                        // Guarda o objet adicionado para
                        // retorná-lo no array de resposta
                        addedObjs.push(obj)

                        // Retorna somente após
                        // inserir todos os objetos
                        if (!--cont) {

                            // Retorna o array ou 
                            // o objeto adicionado
                            res
                                .status(201)
                                .json(
                                    addedObjs.length > 1
                                        ? addedObjs
                                        : addedObjs[0]
                                );

                                req.body.returnObj = obj;
                                next();
                        }

                    });
            }
        });
    }



    /**
     * Remove objeto do banco pelo ID
     */
    remove(req, res, next) {

        // Procura único objeto pelo ID e o remove
        this._model.findByIdAndRemove(req.params.id)
            .catch(err =>
                res.status(500))
            .then(obj =>
                this._requestWithIdResponse(req, res, obj, next));

    }



    /**
     * Atualiza objeto do banco pelo ID
     */
    update(req, res, next) {

        // Procura único objeto pelo ID e atualiza seus dados
        this._model.findByIdAndUpdate(req.params.id,
            req.body,
            {
                new: true, // Retorna o objeto atualizado (Mongoose)
                upsert: true, // Se o objeto não existir, insere
                setDefaultsOnInsert: true // Aplica defaults ao inserir objeto
            })
            .catch(err =>
                res.status(500))
            .then(obj =>
                this._requestWithIdResponse(req, res, obj, next));
    }

};