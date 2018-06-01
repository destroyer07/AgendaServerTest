const AlunoController       = require("./controllers/AlunoController");
const FirebaseController    = require("./controllers/FirebaseController");
module.exports = {
    
    "/alunos": {
        controller: AlunoController,
        apiObject: "Aluno"
    },

    "/firebase": {
        controller: FirebaseController
    }
    
};