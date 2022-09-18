const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
        userName : {type : String , required: true},
        firstName : {type : String },
        lastName : {type : String },
        email : {type : String , required: true, unique: true},
        password : {type : String , required: true},
        age : {type : Number , required: true},
        phone : {type : String},
        gender : {type : String ,enum :['Male' , 'Female'] ,default: 'Male' , required: true},
        online : {type : Boolean ,default: false },
        confirmEmail : {type : Boolean , default: false},
        isBlooked : {type : Boolean , default: false},
        profilePic : {type : String },
        coverPic : {type : Array },
        code:String,
        gallery : {type : Array },
        role : {type : String , default: 'User'},
        follower : [{type : mongoose.Schema.Types.ObjectId , ref:'User' }],
        following : [{type : mongoose.Schema.Types.ObjectId , ref:'User' }],
        socialLink:Array,
        pdfLink:String,
        story : Array,
        lastSeen : String 
},{timestamps:true})

userSchema.pre('save',async function(next){
        this.password =await bcrypt.hash(this.password,parseInt(process.env.SALTROUND))
        next()
})
userSchema.pre('findOneAndUpdate' ,async function(next){
        console.log(this.model);
        const hookData = await this.model.findOne(this.getQuery()).select("__v")
        this.set({__v:hookData.__v+1})
        next()
})

const userModel = mongoose.model('User',userSchema)
module.exports = userModel