const {roles} = require('../../../middleWare/auth')


const endPoint = {
    getAllusers : [roles.Admin],
    chanegRole : [roles.Admin]
    
}




module.exports = {
    endPoint
}