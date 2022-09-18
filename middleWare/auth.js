const jwt = require('jsonwebtoken')
const userModel = require('../DB/model/user')
const roles = {
    User : "User",
    Admin : "Admin",
    "Hr":"Hr"
}
const auth=(accessRoles)=>{
    return async(req,res,next)=>{
        const headerToken = req.headers['authorization']
        if (!headerToken || headerToken == null || headerToken == undefined || !headerToken.startsWith('Bearer')) {
            res.json({message:"In-valid header Token"})
        } else {
            const token = headerToken.split(" ")[1];
            const decoded = jwt.verify(token ,process.env.loginTokenKey)
            if (!decoded || !decoded.isLoggedIn) {
                res.json({message:"In-valid Token"})
            } else {
                const findUser =await userModel.findById(decoded.id).select('userName email role')
                if (!findUser) {
                res.json({message:"In-valid User Account"})
                } else {
                    if (accessRoles.includes(findUser.role)) { 
                        req.user = findUser
                        next()
                    } else {
                         res.json({message:"NOT AUTHORIZED"})
                    }
                    
                }
                
            }
        }
    }
}



module.exports = {
    auth , roles
} 