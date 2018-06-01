const Firebase = require('../../firebase');

/**
 * Controlador de Aluno
 * @param {Express app} app - App do mongoose
 * @param {Object[]} models - Conjunto dos models da aplicação
 * @param {DbAccess} db - Classe de acesso ao banco
 */
module.exports = (app, models, db) => {

    app.post('/medianotas', (req, res) => {
        let alunos = req.body;

        let response = {
            media: 0.0,
            quantidade: 0
        }
        alunos.forEach(aluno => {
            response.media += aluno.nota;
            response.quantidade++;
        });

        response.media /= response.quantidade;

        res.json(response);
    });


    // Tratando notificações pelo Firebase


    app.post('/', (req, res) => {
        sendMessage("add", req.body.returnObj);
    });

    app.put('/:id', (req, res) => {
        sendMessage("upd", req.body.returnObj);
    });
    
    app.delete('/:id', (req, res) => {
        sendMessage("del", req.body.returnObj);
    });
    
    function sendMessage(action, obj) {
        
        let token = 'eQzyKSXe3nU:APA91bEzYYGaj4BH2DCwCNNuqgq7hvW6CdiBLosgUHg-99AYtHrLyNWK-KDpvMevZSBjWZOypHqR2SIX_wAn2lFkwjHlmrs0Ya0AAFTg3cOei74SAg9OBfnbrS5NH5YOow_zlfYW-QU7';
        
        let alunoSync = [
            {
                action: action,
                data: obj
            }
        ];

        console.log("Enviou");
        
        let message = {
            data: {
                time: new Date().toUTCString(),
                aluno: JSON.stringify(alunoSync)
            },
            token: token
        };

        new Firebase().sendMessageToToken(token, message);
    }
}
