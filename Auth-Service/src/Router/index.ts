import authenticationRouter from "./Authencation/authentication.router";
import express from "express";

export const routes=(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/auth',authenticationRouter(dependencies))
    return routes
}
