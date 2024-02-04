import express from "express";
import postRouter from "./postRouter/post.router";

export const routes=(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/post',postRouter(dependencies))
    return routes
}