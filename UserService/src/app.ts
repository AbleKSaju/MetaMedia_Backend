import http from 'http'
import serverConfig from './server'
import getDb from './config/db'
import {routes} from './Router'
import config from './config/config'
import expresscofig from './express'
import express from 'express'
import dependencies from './config/dependencies'

const app=express()
const server=http.createServer(app)
getDb(config)

expresscofig(app)
app.use('/api',routes(dependencies))
serverConfig(server,config).startServer()