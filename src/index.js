import express from 'express'
import {buildApp} from './app';

const app = express()

const endpoint = buildApp(app)


app.listen(8000, () => {
    console.log(`running GraphQl API Server at http://localhost:8000/${endpoint}`)
})