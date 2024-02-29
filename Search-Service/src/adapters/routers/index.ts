import express from "express";
import searchRouter from "./searchRouter/searchRouter";

export const routes=(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/search',searchRouter(dependencies))
    return routes
}