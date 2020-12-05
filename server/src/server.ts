import express from 'express'
import routes from './routes'
import 'express-async-errors'
import './database/connection'

const app = express()

app.use(express.json())
app.use(routes)

app.listen(3434)
