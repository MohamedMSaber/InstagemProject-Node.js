const userModel = require("../../../DB/model/user");
const sendEmail = require("../../../service/sendEmail");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

// sign UP
const signup = async (req, res) => {
    try {
        const { userName, password, email, age, gender } = req.body;
        const newUser = new userModel({ userName, password, email, age, gender });
        const savedUser = await newUser.save()
        const token = jwt.sign({ id: savedUser._id }, process.env.emailTokenSecret, { expiresIn: 5 * 60 })
        const URL = `${req.protocol}://${req.headers.host}/api/auth/confirmEmail/${token}`
        const URL2 = `${req.protocol}://${req.headers.host}/api/auth/reSendToken/${savedUser._id}`
        const message = `<a href=${URL}>plz click Me</a> <br>
        <a href=${URL2}>refresh token</a>
        `
        await sendEmail(savedUser.email, message)
        res.status(201).json({ message: "signUp is Done", savedUser })
    } catch (error) {
        if (error.keyValue?.email) {
            res.status(404).json({ message: "email Exist" })

        } else {
            res.status(500).json({ message: "catch Error ", error })
        }

    }

}


//Confirm Email 
const confirmEmail = async (req, res) => {
    try {
        const token = req.params.token;
        if (!token || token == null || token == undefined) {
            res.status(403).json({ message: "In-valid Token" })
        } else {
            const decoded = jwt.verify(token, process.env.emailTokenSecret)
            if (!decoded) {
                res.status(400).json({ message: "In-valid decoded token1" })
            }
            else {
                const findedUser = await userModel.findById(decoded.id).select('confirmEmail')
                if (!findedUser) {
                    res.status(400).json({ message: "In-valid accout" })
                } else {
                    if (findedUser.confirmEmail) {
                        res.status(400).json({ messag: "Account already confirmed" })
                    } else {
                        const confirmedUser = await userModel.findOneAndUpdate({ _id: findedUser._id }, { confirmEmail: true }, { new: true })
                        res.status(200).json({ messag: "Account has been confirmed" })
                    }

                }
            }
        }
    } catch (error) {
        res.status(500).json({ messag: "catch Error", error })
    }

}

//Sign IN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await userModel.findOne({ email })
        if (!findUser) {
            res.status(404).json({ message: "In-valid user Email" })
        } else {
            if (!findUser.confirmEmail) {
                res.status(400).json({ message: "confirm Email First" })
            } else {
                if (findUser.isBlooked) {
                    res.status(403).json({ message: "sorry your email has been blooked" })
                } else {
                    const match = await bcryptjs.compare(password, findUser.password)
                    if (!match) {
                        res.status(404).json({ message: "In-valid Password" })
                    }
                    else {
                        const token = jwt.sign({ id: findUser._id, isLoggedIn: true }, process.env.loginTokenKey, { expiresIn: '24h' })
                        await userModel.findOneAndUpdate({email},{online:true})
                        res.status(200).json({ messag: "Login Success", token })
                    }
                }

            }

        }
    } catch (error) {
        res.status(500).json({ message: "catch Error ", error })

    }


}



const resendTooken = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
        res.json({ message: "in-valid Account" })
    } else {
        if (user.confirmEmail) {
            res.json({ message: "Account Already Accepted" })
        } else {
            const token = jwt.sign({ id: user._id }, process.env.emailTokenSecret, { expiresIn: 2 * 60 })
            const URL = `${req.protocol}://${req.headers.host}/api/auth/confirmEmail/${token}`
            const URL2 = `${req.protocol}://${req.headers.host}/api/auth/reSendToken/${user._id}`
            const message = `<a href=${URL}>plz click Me</a> <br>
            <a href=${URL2}>refresh token</a>`
            sendEmail(user.email, message)
            res.json({ message: "Done" })
        }
    }
}

const sendCode = async (req, res) => {
    const { email } = req.body;
    const user = await userModel.findOne({ email })

    if (!user) {
        res.json({ message: "invalid Account" })
    } else {
        const code = Math.floor(1000 + Math.random() * 9000);
        const message = `<p>use this code to rest your Password :</p> ${code}`
        await userModel.findByIdAndUpdate(user._id, { code })
        sendEmail(email, message)
        res.json({ message: "Done" })
    }


}

const restPass = async (req, res) => {
    try {
        const { email, code, nPassword } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            res.json({ message: "invalid Account" })
        } else {
            if (user.code.toString() != code.toString()) {
                res.json({ message: "invalid Code" })

            } else {
                const hashNpassword = await bcryptjs.hash(nPassword, parseInt(process.env.SALTROUND))
                await userModel.findByIdAndUpdate(user._id, { password: hashNpassword, code: "" })
                res.json({ message: "Done" })

            }

        }
    } catch (error) {
        res.json({ message: "Error", error })

    }


}


const logout= async(req,res)=>{
    await userModel.findOneAndUpdate({_id:req.user.id},{lastSeen:Date.now(), online:false})
    res.json({ message: "Done" })

}

module.exports = {
    signup,
    confirmEmail,
    login,
    resendTooken,
    sendCode,
    restPass,
    logout
}