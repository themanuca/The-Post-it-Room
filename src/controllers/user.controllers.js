// const user = require('../models/user.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { response } = require('express');
const secret = 'd@o&@Ie$*pjaJC8m!@C7%Pqhu$V*We';


module.exports = {
   async index(req, res){
        const user = await User.find();
        res.json(user);
    },

    async create(req, res){
        const {nome_user,username_user,email_user,senha_user} = req.body;

        // Chegando se não ta vazio, mas essa validação já ocorre na MODEL
        if(!nome_user){
            
            return res.status(299).json({msg:'O nome é obrigatório!'})
        }

        if(!username_user){
            return res.status(299).json({msg:'O User é obrigatório!'})
        }

        if(!email_user){
            return res.status(299).json({msg:'O Email é obrigatório!'})
        }

        if(!senha_user){
            return res.status(299).json({msg:'O Senha é obrigatório!'})
        }

        //checando EMAIL

        const emailChecado = await User.findOne({email_user})
        const username = await User.findOne({username_user})

        if(emailChecado){
            return res.status(299).json({msg:'Email já cadastrado'})
        }else if (username){
            return res.status(299).json({msg:'Username já esta sendo usado'})

        }else {
            //Criptografar senha

            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(senha_user, salt);
            let data = {};
            data = {nome_user,username_user,email_user,senha_user:senhaHash};
            try{
                
                var user = await User.create(data);
                

                return await res.status(200).json({msg:'Usuario Registrado com Sucesso'});

            }catch(error){

                res.status(500).json({msg:'Erro no servidor'})
            }
            
        }
        
        
        
    },

    //Login do Usuario
    async login(req, res){

        const {email_user, senha_user} = req.body;
        
        if(!email_user){
            return res.status(299).json({msg:'O Email é obrigatório!'})
        }

        if(!senha_user){
            return res.status(299).json({msg:'O Senha é obrigatório!'})
        }

        //validação
        const verificaEmail = await User.findOne({email_user})

        if(!verificaEmail){
            return res.status(299).json({msg:"Email não cadastrado"})
        }
        
        //checar senha

        const checaSenha = await bcrypt.compare(senha_user, verificaEmail.senha_user)
        
        if(!checaSenha){
            return res.status(299).json({msg:"Senha Invalida"})
        }
    
    
        //Token do usuario

        try{

            const token = jwt.sign({
                id: verificaEmail._id,
            },
            secret,
            )
            const userid = verificaEmail._id;
            const email = verificaEmail.email_user;

           res.status(200).json({msg:'Autentificação realizada com sucesso', token, userid, email})

        }catch(err){

            console.log(error)
            res.status(500).json({
                msg:'Aconteceu um erro no servidor, tente novamente mais ttarde!',
            })
        }
    
    },

    //ROTA PRIVADA, COM MIDDILEW
    async dash(req, res){

        const id = req.params.id;
        
        //checar usuario valido

        const user = await User.findById(id, '-senha_user')
        if(!user){
            return res.status(299).json({msg:'Usuario não encontrado'})
        }
        
       //res.status(200).json({user})
    },


    // ACESSAR O TOKEN PARA VALIDAR A ROTA PRIVADA
    checartoke(req, res, next){
        
        const authHearder = req.headers["authorization"]; //ACESSAR O TEKEN
        
       const token = authHearder && authHearder.split(' ')[1]

        if(!authHearder){
            return res.status(401).json({msg: "Acesso Negado !"+authHearder})
        }
    
        try{
          
            jwt.verify(authHearder, secret,(err, decoded)=>{
                if(err){

                    res.json({auth:false, message:"FALHA NA AUTENTI"});
                
                }else{
                    const userid = verificaEmail._id;

                    // req.userid = decoded.id;
                  res.json({msg:"VALIDADO ARROBADO"})
                    next();
                }
            })
           


        }catch(error){
            jwt.verify(authHearder, secret,(err)=>{
                if(err){

                    res.json({auth:false, message:"FALHA NAaaa AUTENTI"});
                
                }else{
                    

                    // req.userid = decoded.id;
                  res.json({msg:"VALIDADO ARROBADO"})
                    next();
                }
            })
            // res.status(400).json({msg:"token invalido"})
            // next();
        }
    
    }

}
