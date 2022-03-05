const User_post = require('../models/user_post.model');

module.exports = {
   async index(req, res){
       const {post_id} = req.body;
        const userpost = await User_post.find({post_id});

        res.json(userpost);
    },

    async create(req, res){
        const {post_id,post_texto,post_cor} = req.body;

        let data = {};
        
        data =  {post_texto,post_cor, post_id}
      
        let post = await User_post.create(data);

        return res.status(200).json(post);
    }
}