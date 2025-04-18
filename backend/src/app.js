import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app  = express()

app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true // Allow cookies or credentials if needed
  }));



app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended : true , limit : "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
import requestRouter from "./routes/transaction.routes.js"
import bookRouter from './routes/book.routes.js'
import userRouter from "./routes/user.routes.js"

app.use('/api/v1',requestRouter)
app.use('/api/v1',bookRouter)
app.use('/api/v1' , userRouter)

export {app}