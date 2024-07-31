import 'reflect-metadata'
import { dbConnect } from "./db/dbConnect";
import config from 'config'
import cors from 'cors'
import './controller'
import express from 'express'
import { InversifyExpressServer } from 'inversify-express-utils';
import { container } from './inversify.config';

const app = express()
app.use(express.json())
app.use(cors())

const server = new InversifyExpressServer(container,app)
server.setConfig(async ()=>{
    await dbConnect()
})
server.build().listen((config.get('port')),()=>console.log('port connection established'))

//YUvd9UYm4LzqRtW4