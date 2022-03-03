const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    post_texto:String,
    post_cor:String,
    post_id:String
},{
    timestamps:true
})

DataSchema.pre('save', function(next){
    next()
});

const user_post = mongoose.model('user_post', DataSchema);
module.exports = user_post;