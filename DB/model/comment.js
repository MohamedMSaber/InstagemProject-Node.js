const { default: mongoose } = require('mongoose');
const mogoose = require('mongoose');

const commentSchema = new mongoose.Schema({
        text:String,
        postId:{type:mongoose.Schema.Types.ObjectId , ref:"Post" ,required : true},
        createdBy:{type:mongoose.Schema.Types.ObjectId , ref:"User" ,required : true},
        likes:[{type:mongoose.Schema.Types.ObjectId , ref:"User"}],
        isDeleted : {type:Boolean , default:false},
        deleteBy :{type:mongoose.Schema.Types.ObjectId , ref:"User" },
        replys:[{type:mongoose.Schema.Types.ObjectId , ref:"User" }]

},{timestamps:true})



const commentModel = mogoose.model("post" , commentSchema);
module.exports = commentModel;