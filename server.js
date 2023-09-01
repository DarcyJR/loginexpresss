require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        console.log('Base Conectada');
        app.emit('conectado')
    }).catch((e) => {
        console.log(e)
    });

const session = require('express-session');//
const flash = require('connect-flash');//armazenar mensagens temporárias no processo de solicitação-resposta, tramamento erros, sucessos ou outras informações
const {middlewareGlobal} = require('./src/middlewares/middlewares');

app.use(express.json());//Analisar o body como json
app.use(express.urlencoded({ extends: true }));//Analisar o body de um formulário html
app.use(express.static(path.resolve(__dirname, 'public')));//Pagina estatica para captar o css

app.use(session({
    secret: '10011951Dj2812/',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(middlewareGlobal);

//routes
app.use(routes);

app.on('conectado', () => {
    app.listen(4000, () => {
        console.log('Servidor Executado');
        console.log('http://localhost:4000');
    })
})
