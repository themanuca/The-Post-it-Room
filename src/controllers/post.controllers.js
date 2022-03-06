const PostIt = require('../models/post.model');

module.exports = {
   async index(req, res){
        const post = await PostIt.find();
        res.json(post);
    },

    async create(req, res){
        try{    
            const {post_texto,post_cor} = req.body;

            let data = {};
            
            data = {post_texto,post_cor}
    
            let post = await PostIt.create(data);
    
            return res.status(200).json(post);

        }catch(error){
            return res.status(150).json(error+ " não foi");
        }
       
    },

    teste(req, res){

        return res.status(200).json({msg:"ROTA ACESSADA"})
    }

}