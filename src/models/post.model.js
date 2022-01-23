const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    post_texto:String,
    post_cor:String,
},{
    timestamps:true
})

DataSchema.pre('save', function(next){
    next()
});

const postIt = mongoose.model('postIt', DataSchema);
module.exports = postIt;