require('dotenv').config()
require('express-async-errors')
import express from 'express'
import connectDB from './db/connect'
import path from 'path'
//routes
import authRouter from './routes/auth'

import userRouter from './routes/user'

//deployment security and optimization 
import helmet from 'helmet'
import cors from 'cors'
const xss = require('xss-clean')
import rateLimit from 'express-rate-limit'


//middlewares
import validateTokenMiddleware from './middleware/authentication'
import notFoundMiddleware from './middleware/notFound'
import errorHandlerMiddleware from './middleware/errorHandler'




const app = express()


app.use(express.json())

//deployment security and optimization
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute
    max: 1000, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  })
)


//routes
app.get('/', (req, res) => {
  res.status(200).json({status: 'success', message: 'Sure Api'})
})

// static files
app.use('/static', express.static(path.join(__dirname, 'public')))


//routers
app.use('/api/v1/auth', authRouter)

app.use('/api/v1/user', validateTokenMiddleware(), userRouter )






app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 4000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI!)
    console.log('Database connected')
    app.listen(port, () => console.log(`Server is listening on port ${port}...`))
  } catch (error) {
    console.log(error)
  }
}
start()


