import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from '../config/config'
import getDb from '../config/db'
import express, { NextFunction, Request, Response } from 'express'
import {routes} from './adapters/routes'
import dependencies from './frameworks/config/dependencies'
import { Server, Socket } from 'socket.io';
import { debounceMiddleware } from './events/DebouncingMiddleware'
import expressConfig from './express'
import socketConfig from './socket'
import { chatConsumer } from './events/KafkaConsumer'
const app=express()
expressConfig(app)
dotenv.config()
getDb(config)
export const io: Server = require('socket.io')(8081, {
  cors: { origin: 'http://meta-media.in' }
});
socketConfig()
const server=http.createServer(app)

 chatConsumer(dependencies)
app.use(debounceMiddleware)
app.use('/api',routes(dependencies))

serverConfig(server,config).startServer()