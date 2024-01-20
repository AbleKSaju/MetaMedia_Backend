import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from './config/config'
import getDb from './config/db'
import express from 'express'
import {authconsumer} from './events/authconsumer'
const app=express()
getDb(config)

const server=http.createServer(app)
dotenv.config()

 authconsumer()




serverConfig(server,config).startServer()