import express from "express";
import chatRouter from "./chatRouter/chatRouter";

export const routes=(dependencies:any)=>{
    
    const routes = express.Router()

    routes.use('/chat',chatRouter(dependencies))

    return routes
}