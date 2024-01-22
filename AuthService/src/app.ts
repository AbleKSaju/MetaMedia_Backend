import http from 'http'
import serverConfig from './server'
import dotenv from 'dotenv'
import config from './config/config'
import getDb from './config/db'
import express from 'express'
const cookieParser = require('cookie-parser');
import cors from 'cors'
import {authconsumer} from './events/authconsumer'
import {routes} from './Router'
import dependencies from './config/dependencies'
const app=express()
getDb(config)

const server=http.createServer(app)
dotenv.config()

 authconsumer()

 app.use(express.json());
 app.use(express.urlencoded({ extended: false }));
 app.use(cookieParser(process.env.COOKIEPARSERSECRET));
 app.use(
    cors({
      origin: "http://localhost:5173",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );


 app.use('/api',routes(dependencies))

serverConfig(server,config).startServer()