require('dotenv').config()
const express = require('express')
const connectDB = require('./DB/connection')
const app = express()
const cors = require('cors')
app.use(cors())
const path  = require("path")
app.use(express.json())
const port = process.env.PORT
const fs = require('fs')
const indexRouter = require("./modules/index.router")
const schedule = require('node-schedule');

connectDB()
app.use('/api/auth',indexRouter.authRouter)
app.use('/api/user',indexRouter.userRouter)
app.use('/api/uploads' ,express.static(path.join(__dirname,"./uploads")))
app.use('/api/post',indexRouter.postRouter)
app.use('/api/admin',indexRouter.adminRouter)
const { createInvoice } = require("./service/pdf");
const sendEmail = require('./service/sendEmail')
const invoice = {
    shipping: {
      name: "John Doe",
      address: "1234 Main Street",
      city: "San Francisco",
      state: "CA",
      country: "US",
      postal_code: 94111
    },
    items: [
      {
        item: "TC 100",
        description: "Toner Cartridge",
        quantity: 2,
        amount: 6000
      },
      {
        item: "USB_EXT",
        description: "USB Cable Extender",
        quantity: 1,
        amount: 2000
      }
    ],
    subtotal: 8000,
    paid: 0,
    invoice_nr: 1234
  };
createInvoice(invoice, path.join(__dirname,'./uploads/pdf/invoice.pdf'));
attachment = fs.readFileSync(path.join(__dirname,'./uploads/pdf/invoice.pdf')).toString("base64");








app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Server is listening on port ${port}!`))
 