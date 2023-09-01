const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const LoginSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    //cadastrando o usuario no banco
    async register() {
        this.valida();

        await this.userExists();

        if (this.errors.length > 0) return;

        //codificação da senha
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        //criação do registro no bancoCliente 
        this.user = await LoginModel.create(this.body);
    }

    valida() {
        this.cleanUp();
        //valida e-mail
        if (!validator.isEmail(this.body.email)) {
            this.errors.push('E-mail inválido');
            console.log(this.errors);
        };

        if (this.body.password.length < 8) {
            this.errors.push('A senha precisa ter entre 8 e 50 caracteres.');
            console.log(this.errors);
        };
    };

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            };
        };

        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            password: this.body.password
        };
    };

    async userExists(){
        this.user = await LoginModel.findOne({email: this.body.email});
        if(this.user){
            this.errors.push('Usuário já existe');
            console.log(this.errors);
        }
    }

};

module.exports = Login;

