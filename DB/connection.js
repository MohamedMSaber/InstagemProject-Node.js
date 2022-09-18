const mongoose = require('mongoose')

const connectDB = ()=>{
    return mongoose.connect(process.env.DBURL)
    .then(result => console.log(`connect DB to URL ::::: ${process.env.DBURL} `))
    .catch(err=> console.log(`fail to connect DB`))
}

module.exports = connectDB 