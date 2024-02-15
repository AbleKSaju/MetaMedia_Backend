import express from "express";
// import postRouter from "./postRouter/post.router";
import storyRouter from "./storyRouter/storyRouter";

export const routes=(dependencies:any)=>{
    const routes = express.Router()
    // routes.use('/post',postRouter(dependencies))
    routes.use('/story',storyRouter(dependencies))
    return routes
}