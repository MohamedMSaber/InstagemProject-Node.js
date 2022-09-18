const authRouter = require ("./auth/auth.router")
const userRouter = require("./user/user.roueter")
const postRouter = require("./post/post.router")
const adminRouter = require("./admin/admin.router")


module.exports ={
    authRouter,
    userRouter,
    postRouter,
    adminRouter

}