const express = require('express');
const PostIt = require('./controllers/post.controllers');
const routes = express.Router();

routes.get('/', PostIt.index);


//Rota de Postagem
routes.post('/api/post',PostIt.create);


module.exports = routes;
