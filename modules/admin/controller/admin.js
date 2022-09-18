
const userModel = require("../../../DB/model/user")
const sendEmail = require("../../../service/sendEmail")




const getAllUSers = async(req,res)=>{
    const users =await userModel.find({})
    res.json({message:"Done", users})
}

const chageRole = async(req,res)=>{
    const {id} = req.params;
    const {role} = req.body;
    const user = await userModel.findOneAndUpdate({_id:id} , {role})
    sendEmail(user.email , `<h1>admin change your role to ${role}</h1>`)
    res.json({message:"Done"})

}


const blookUser = async(req,res)=>{
    const {id} = req.params;
    const user = await userModel.findOneAndUpdate({_id:id} , {isBlooked : true})
    sendEmail(user.email , `<h1>admin blooked Your Account</h1>`)
    res.json({message:"Done"})

}

module.exports = {
    getAllUSers,
    chageRole,
    blookUser
}