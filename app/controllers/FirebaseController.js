/**
 * Controlador de Aluno
 * @param {Express app} app - App do mongoose
 * @param {Object[]} models - Conjunto dos models da aplicação
 * @param {DbAccess} db - Classe de acesso ao banco
 */
module.exports = (app, models, db) => {

    app.post('/dispositivo', (req, res) => {
        
        let token = req.headers.token;

        console.log(token);
        
        res.status(200).json({status: "ok"});
    });

}
