import http from 'http'
import serverConfig from './server'
import connectDB from '../config/db.connect'
import {routes} from './adapters/routes'
import config from '../config/config'
import expresscofig from './express'
import express from 'express'
import dependencies from '../src/frameworks/config/dependencies'
import dotenv from 'dotenv'

const app=express()
const server=http.createServer(app)
dotenv.config()
connectDB(config)
expresscofig(app)

app.use('/api',routes(dependencies))
serverConfig(server,config).startServer()
