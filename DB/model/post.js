const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const postSchema = new mongoose.Schema({
        text:String,
        image:{type:Array , required:true},
        createdBy:{type:mongoose.Schema.Types.ObjectId , ref:"User" ,required : true},
        likes:[{type:mongoose.Schema.Types.ObjectId , ref:"User"}],
        isDeleted : {type:Boolean , default:false},
        deleteBy :{type:mongoose.Schema.Types.ObjectId , ref:"User" },

},{timestamps:true})



const postModel = mogoose.model("Post" , postSchema);
module.exports = postModel;