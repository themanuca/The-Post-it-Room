const express = require('express');
const { route } = require('express/lib/application');
const PostIt = require('./controllers/post.controllers');
const User = require('./controllers/user.controllers');
const routes = express.Router();

routes.get('/', PostIt.index);


//Rota de Postagem no muro públic
routes.post('/api/post',PostIt.create);

//Rota de registro de usuario
routes.post('/api/register', User.create);

//Rota de login de usuario
routes.post('/api/user/login',User.login);

//Rota privada para logados
routes.get('/dashboard/:id',User.checartoke, User.dash);


module.exports = routes;
