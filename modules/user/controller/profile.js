const userModel = require("../../../DB/model/user")
var QRCode = require('qrcode')
const displayProfile = async (req, res) => {
    try {
        const User = await userModel.findById(req.user._id)
        res.json({ Message: "Done", User })
    } catch (error) {
        res.json({ Message: "catch Error", error })

    }
}

const profilePic = async (req, res) => {
    try {
        if (req.fileError) {
            res.json({message:"in valid Format"})
        } else {
            console.log("Hello");
            const imageURL = `${req.finalDes}/${req.file.filename}`
            const User = await userModel.findOneAndUpdate(req.user._id ,{profilePic:imageURL} , {new:true})
            res.json({ Message: "Profile Pic Updated" , User})
        }
        
    } catch (error) {
        res.json({ Message: "catch Error dd", error })

    }
}

const coverPic = async (req, res) => {
    try {
        if (req.fileError) {
            res.json({message:"in valid Format"})
        } else {
            const urls =[]
            req.files.forEach(file => {
                urls.push(`${req.finalDes}/${file.filename}`)
            });

            const User = await userModel.findOneAndUpdate(req.user._id ,{coverPic :urls} , {new:true})
            
            res.json({ Message: "cover Pic Updated" , User})
        }
        
    } catch (error) {
        res.json({ Message: "catch Error sd", error })

    }
}

const qr = async(req ,res) =>{
    const user = await userModel.findOne({_id : req.user.id}).select("userName email");
    QRCode.toDataURL(`${req.protocol}://${req.headers.host}/user/profile/${user._id}`, function (err, url) {
        if(err){
            res.json({message:"Qr Code Error"})
        }
        else{
            res.json({message:"Done" , url})
        }
      })
}






module.exports =
{
    displayProfile,
    profilePic,
    coverPic,
    qr
}