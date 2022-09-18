const { roles } = require("../../middleWare/auth");


const endPoint ={
    createPost : [roles.User , roles.Admin],
    comment : [roles.User , roles.Admin]
}

module.exports ={
    endPoint
}