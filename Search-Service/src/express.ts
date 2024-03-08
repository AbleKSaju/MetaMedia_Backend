import express, { Express,Request,Response } from "express";
import cors from "cors";
import path from 'path'
const cookieParser = require("cookie-parser");

import session, { SessionOptions, MemoryStore } from "express-session";
const expresscofig = (app: Express): void => {
  const store = new MemoryStore();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIEPARSERSECRET));
  app.use(express.static('public/'));

  app.use(
    cors({
      origin: ['http:client-srv:5173','http://metamedia.com','http://localhost:5173'],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true,
    })
  );

  
  app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 60 * 1000,
        httpOnly: true,
      },
      store: store,
    } as SessionOptions)
  );
};

export default expresscofig;
