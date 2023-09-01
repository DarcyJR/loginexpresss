const Login = require('../models/LoginModel');

exports.indexLogin = (req, res) => {//tela de entrada
   return res.render('login');
}

exports.login = (req, res) => {//tela de login
    //fazendo a verificação de de login email e senha
    return res.render('login');
}

exports.indexCadastro = (req, res) => {//tela de cadastro
    return res.render('cadastro');
}

exports.cadasto = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.register();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(()=>{
                return res.redirect('back');
            })
            return;
        };

        req.flash('success', 'Usuario criado');
        req.session.save(()=>{
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        return res.render('404');
    }
}

