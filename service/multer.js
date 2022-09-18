const multer = require('multer')
const path = require('path')
const { nanoid } = require('nanoid')
const fs= require('fs')
const fileValidation = {
    Image:['image/png' , 'image/jpeg' , 'image/gif'],
    pdf:['application/pdf']
}
const HME = (errr , req , res ,next)=>{
    if (errr) {
        res.json({message:"File too large" , errr})
    } else {
        next()
    }
}
function myMulter(customPath , customValidation) {
    if (!customPath || customPath ==null) {
        customPath = 'genral'
    } 
    const fullPath = path.join(__dirname, `../uploads/${customPath}`)
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath,{recursive:true})
    } 
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, fullPath)
            req.finalDes = `uploads/${customPath}`
        },
        filename: function (req, file, cb) {
            cb(null, nanoid() + "_" + file.originalname)
        }
    })
    const fileFilter = function (req, file, cb) {
        if (customValidation.includes(file.mimetype)) {
            cb(null,true)
        }
        else{
            req.fileError = true
            cb(null , false)
        }
    }

    const upload = multer({dest:fullPath , limits:{fileSize:9999999999},fileFilter , storage})

    return upload;
}

module.exports = {
    myMulter,
    fileValidation,
    HME
}