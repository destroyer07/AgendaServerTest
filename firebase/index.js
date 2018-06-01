var admin = require('firebase-admin');
var config = require('../config/firebase');

function getFirebaseAdmin() {
    admin.initializeApp({
        credential: admin.credential.cert(config.serviceAccount),
        databaseURL: config.databaseURL
    });

    return admin;
}

let singletonAdmin = null;

class Firebase {
    
    constructor() {
        if (!singletonAdmin) {
            singletonAdmin = getFirebaseAdmin();
        }

        this._admin = singletonAdmin;
    }

    sendMessageToToken(token, message) {
        admin.messaging().send(message)
            .then((response) => {
                console.log('Mensagem enviada com sucesso: ', response);
            })
            .catch((error) => {
                console.log('Erro ao enviar mensagem: ', error);
            });
    }
}

module.exports = Firebase;
