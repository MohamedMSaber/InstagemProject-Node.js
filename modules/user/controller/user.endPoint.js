const {roles} = require("../../../middleWare/auth")
const endPoint = {
    displayProfile : [roles.Admin , roles.Hr , roles.User],
    profilePic : [ roles.User ] 
}

module.exports = endPoint