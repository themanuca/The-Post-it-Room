const PostIt = require('../models/post.model');

module.exports = {
   async index(req, res){
        const post = await PostIt.find();
        res.json(post);
    },

    async create(req, res){
        const {post_texto,post_cor} = req.body;

        let data = {};
        
        data = {post_texto,post_cor}

        let post = await PostIt.create(data);

        return res.status(200).json(post);
    }
}