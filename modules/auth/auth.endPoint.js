const { roles } = require("../../middleWare/auth");

const endPoint = {
    logout :[roles.User , roles.Admin , roles.Hr]
}

module.exports = {
    endPoint
}