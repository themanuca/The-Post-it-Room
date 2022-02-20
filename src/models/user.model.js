const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_user:{type:String, required:true},
    username_user:{type:String, required:true},
    email_user:{type:String, required:true},
    senha_user: {type:String, minlength:8, required:true}
},{
    timestamps:true
})

DataSchema.pre('save', function(next){
    next()
});

const user = mongoose.model('user', DataSchema);
module.exports = user;