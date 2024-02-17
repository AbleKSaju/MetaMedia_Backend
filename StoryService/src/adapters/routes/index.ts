import express from "express";
import highlightRouter from "./highlightRouter/highlightRouter";
import storyRouter from "./storyRouter/storyRouter";

export const routes=(dependencies:any)=>{
    const routes = express.Router()
    routes.use('/highlight',highlightRouter(dependencies))
    routes.use('/story',storyRouter(dependencies))
    return routes
}