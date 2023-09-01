const express = require('express');
const route = express.Router();

const loginController = require('./src/controllers/loginController');
const middleware = require('./src/middlewares/middlewares');
//login
route.get('/', loginController.indexLogin);//pagina inicial

route.post('/login/login', loginController.login);//post do login

route.get('/login/cadastro', loginController.indexCadastro);//pagina cadastro

route.post('/login/cadastro', loginController.cadasto);//post cadastro//retorna para indexLogin

module.exports = route;