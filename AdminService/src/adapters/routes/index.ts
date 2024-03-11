import express from "express";
import adminRouter from "./adminRouter/adminRouter";

export const routes=(dependencies:any)=>{
    
    const routes = express.Router()

    routes.use('/changeUserStatus',adminRouter(dependencies))


    return routes
}